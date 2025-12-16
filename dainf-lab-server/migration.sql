\echo 'Starting migration from test_labs to postgres'
BEGIN;
CREATE EXTENSION IF NOT EXISTS dblink;

-- Connect to source DB (adjust credentials if needed)
SELECT dblink_connect('src', 'dbname=test_labs host=127.0.0.1 user=postgres password=postgres');

-- Align schema with latest app (cidade/pais removed; fornecedor.cidade is varchar)
DO $$
DECLARE
  fk_name text;
BEGIN
  -- Drop FK to cidade if present
  SELECT conname INTO fk_name
  FROM pg_constraint
  WHERE conrelid = 'public.fornecedor'::regclass
    AND confrelid = 'public.cidade'::regclass;
  IF fk_name IS NOT NULL THEN
    EXECUTE format('ALTER TABLE public.fornecedor DROP CONSTRAINT %I', fk_name);
  END IF;

  -- Replace cidade_id with cidade (varchar)
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'fornecedor' AND column_name = 'cidade_id'
  ) THEN
    ALTER TABLE public.fornecedor DROP COLUMN IF EXISTS cidade_id;
  END IF;
  ALTER TABLE public.fornecedor ADD COLUMN IF NOT EXISTS cidade varchar(60);
  ALTER TABLE public.fornecedor ALTER COLUMN cidade TYPE varchar(60);

  -- Drop obsolete tables if they still exist
  DROP TABLE IF EXISTS public.cidade CASCADE;
  DROP TABLE IF EXISTS public.pais CASCADE;

  -- Purchase observation field
  ALTER TABLE public.purchase ADD COLUMN IF NOT EXISTS observation text;

  -- Solicitation observation field (migrate description -> observation and drop description)
  ALTER TABLE public.solicitation ADD COLUMN IF NOT EXISTS observation text;
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'solicitation' AND column_name = 'description'
  ) THEN
    UPDATE public.solicitation
    SET observation = COALESCE(public.solicitation.observation, public.solicitation.description)
    WHERE observation IS NULL;
    ALTER TABLE public.solicitation DROP COLUMN description;
  END IF;
END$$;

-- Optional: clear target tables to re-run safely
TRUNCATE TABLE
  return_item, return, loan_item, loan,
  issue_item, issue,
  reservation_item, reservation,
  solicitation_item, solicitation,
  purchase_item, purchase,
  asset, inventory, item_image, item,
  category, fornecedor,
  app_user, user_recovery
RESTART IDENTITY CASCADE;

-- Suppliers (cidade as string; no cidade/pais tables)
INSERT INTO public.fornecedor (id, cnpj, ie, telefone, nome_fantasia, razao_social, endereco, observacao, cep, email, cidade, estado)
SELECT id, cnpj, ie, COALESCE(telefone, '') AS telefone, nome_fantasia, razao_social,
       endereco, observacao, NULL::varchar AS cep, COALESCE(email, '') AS email,
       cidade, uf AS estado
FROM dblink('src', '
  SELECT f.id, f.cnpj, f.ie, f.telefone, f.nome_fantasia, f.razao_social,
         f.endereco, f.observacao, f.email, c.nome AS cidade, es.uf
  FROM public.fornecedor f
  LEFT JOIN public.cidade c ON c.id = f.cidade_id
  LEFT JOIN public.estado es ON es.id = f.estado_id
') AS t(id bigint, cnpj varchar, ie varchar, telefone varchar, nome_fantasia varchar,
        razao_social varchar, endereco varchar, observacao varchar, email varchar,
        cidade varchar, uf varchar)
ON CONFLICT (id) DO NOTHING;

-- Categories (seeded taxonomy aligned with import.sql)
INSERT INTO public.category (id, description, parent_id, icon) VALUES
  (1, 'Ferramentas', NULL, 'pi pi-cog'),
  (2, 'Componentes', NULL, 'pi pi-microchip'),
  (3, 'Raspberry Pi', NULL, 'pi pi-desktop'),
  (4, 'Arduino', NULL, 'pi pi-code'),
  (5, 'Periféricos', NULL, 'pi pi-table'),
  (6, 'Cabos', NULL, 'pi pi-link'),
  (7, 'Prototipagem', NULL, 'pi pi-th-large'),
  (8, 'Bateria e Carregadores', NULL, 'pi pi-bolt'),
  (9, 'Motores', NULL, 'pi pi-car'),
  (10, 'Material Expediente', NULL, 'pi pi-file'),
  (11, 'Impressora 3D', NULL, 'pi pi-cog'),
  (12, 'Lego', NULL, 'pi pi-th-large'),
  (13, 'Mobilia', NULL, 'pi pi-table'),
  (14, 'Displays e Iluminação', NULL, 'pi pi-lightbulb'),
  (15, 'Acessórios', NULL, 'pi pi-box'),
  (16, 'Manuais', 1, 'pi pi-wrench'),
  (17, 'Soldagem', 1, 'pi pi-hammer'),
  (18, 'Elétricas', 1, 'pi pi-bolt'),
  (19, 'Potenciômetros', 2, 'pi pi-sliders-h'),
  (20, 'Sensores', 2, 'pi pi-eye'),
  (21, 'Drivers', 2, 'pi pi-file-check'),
  (22, 'Resistores', 2, 'pi pi-minus'),
  (23, 'Circuitos Integrados', 2, 'pi pi-microchip'),
  (24, 'Transistores', 2, 'pi pi-arrows-h'),
  (25, 'Botões e Chaves', 2, 'pi pi-power-off'),
  (26, 'Diodos', 2, 'pi pi-arrow-right'),
  (27, 'Microcontroladores', 2, 'pi pi-code'),
  (28, 'Capacitores', 2, 'pi pi-cloud'),
  (29, 'Reguladores de Tensão', 2, 'pi pi-ellipsis-h'),
  (30, 'Conectores', 2, 'pi pi-sliders-v'),
  (31, 'Atuadores e Relés', 2, 'pi pi-link'),
  (32, 'Módulos e Conversores', 2, 'pi pi-sync'),
  (33, 'Placas', 3, 'pi pi-sitemap'),
  (34, 'Acessórios', 3, 'pi pi-box'),
  (35, 'Shields', 4, 'pi pi-inbox'),
  (36, 'Placas', 4, 'pi pi-sitemap'),
  (37, 'Drivers', 9, 'pi pi-file-check'),
  (38, 'Servo Motor', 9, 'pi pi-compass'),
  (39, 'LEDs', 14, 'pi pi-sun'),
  (40, 'Displays', 14, 'pi pi-desktop')
ON CONFLICT (id) DO NOTHING;

-- Items (map legacy grupo to new category ids)
WITH cat_map(old_id, new_id) AS (
  VALUES
    (1, 1),   (2, 19),  (3, 15),  (4, 16),  (5, 20),  (6, 17),  (7, 21),
    (8, 33),  (9, 5),   (10, 6),  (11, 35), (12, 39), (13, 40), (14, 7),
    (15, 18), (16, 8),  (17, 37), (18, 10), (19, 22), (20, 23), (21, 24),
    (22, 25), (23, 26), (24, 27), (25, 28), (26, 2),  (27, 29), (28, 30),
    (29, 31), (31, 32), (32, 36), (33, 34), (34, 9),  (35, 38), (36, 11),
    (37, 12), (38, 13)
),
src_item AS (
  SELECT id, nome, descricao, grupo_id, qtde_minima, valor, siorg, tipo_item
  FROM dblink('src', '
    SELECT id, nome, descricao, grupo_id, qtde_minima, valor, siorg, tipo_item
    FROM public.item
  ') AS t(id bigint, nome varchar, descricao varchar, grupo_id bigint,
          qtde_minima numeric, valor numeric, siorg numeric, tipo_item varchar)
)
INSERT INTO public.item (id, name, description, category_id, minimum_stock, price, siorg, type)
SELECT s.id, s.nome, s.descricao, COALESCE(m.new_id, 2), s.qtde_minima, s.valor, s.siorg::text,
       CASE s.tipo_item WHEN 'C' THEN 'CONSUMABLE' WHEN 'P' THEN 'DURABLE' ELSE 'DURABLE' END
FROM src_item s
LEFT JOIN cat_map m ON m.old_id = s.grupo_id
ON CONFLICT (id) DO NOTHING;

-- Item images
INSERT INTO public.item_image (id, item_id, bucket, content_type, name)
SELECT id, item_id, 'local'::varchar AS bucket, content_type, name_image
FROM dblink('src', 'SELECT id, item_id, content_type, name_image FROM public.item_image')
     AS t(id bigint, item_id bigint, content_type varchar, name_image varchar)
ON CONFLICT (id) DO NOTHING;

-- Inventory (one row per item using saldo)
INSERT INTO public.inventory (id, item_id, quantity)
SELECT id, id AS item_id, COALESCE(saldo, 0)
FROM dblink('src', 'SELECT id, saldo FROM public.item') AS t(id bigint, saldo numeric)
ON CONFLICT ON CONSTRAINT inventory_pkey DO UPDATE
  SET quantity = EXCLUDED.quantity,
      item_id = EXCLUDED.item_id;

-- Assets (using localizacao/patrimonio)
INSERT INTO public.asset (id, item_id, location, serial_number)
SELECT id, id AS item_id, localizacao, patrimonio::text
FROM dblink('src', 'SELECT id, localizacao, patrimonio FROM public.item')
     AS t(id bigint, localizacao varchar, patrimonio numeric)
ON CONFLICT (id) DO NOTHING;

-- Users (app_user)
INSERT INTO public.app_user (
  id, email, nome, password, telefone, documento, foto_url,
  email_verificado, enabled, clearance_date, clearance_code, role
)
SELECT
  t.id, t.email, t.nome, t.password, t.telefone, t.documento, t.foto_url,
  t.email_verificado, TRUE AS enabled, NULL::timestamptz AS clearance_date,
  t.codigo_verificacao AS clearance_code,
  COALESCE(MAX(
    CASE t.permissao
      WHEN 'ROLE_ADMINISTRADOR' THEN 'ROLE_ADMIN'
      WHEN 'ROLE_LABORATORISTA' THEN 'ROLE_LAB_TECHNICIAN'
      WHEN 'ROLE_PROFESSOR' THEN 'ROLE_PROFESSOR'
      WHEN 'ROLE_ALUNO' THEN 'ROLE_STUDENT'
      ELSE 'ROLE_STUDENT'
    END
  ), 'ROLE_STUDENT') AS role
FROM dblink('src', '
  SELECT u.id, u.email, u.nome, u.password, u.telefone, u.documento,
         u.foto_url, u.email_verificado, u.codigo_verificacao,
         p.nome AS permissao
  FROM public.usuario u
  LEFT JOIN public.usuario_permissoes up ON up.usuario_id = u.id
  LEFT JOIN public.permissao p ON p.id = up.permissoes_id
') AS t(id bigint, email varchar, nome varchar, password varchar, telefone varchar,
        documento varchar, foto_url varchar, email_verificado boolean,
        codigo_verificacao varchar, permissao varchar)
GROUP BY t.id, t.email, t.nome, t.password, t.telefone, t.documento,
         t.foto_url, t.email_verificado, t.codigo_verificacao
ON CONFLICT (id) DO NOTHING;

-- User recovery tokens
INSERT INTO public.user_recovery (id, user_id, reset_token, token_expiration_date)
SELECT r.id, u.id AS user_id, r.code, r.date_time::timestamptz
FROM dblink('src', '
  SELECT r.id, r.code, r.email, r.date_time FROM public.tb_recover_password r
') AS r(id bigint, code varchar, email varchar, date_time date)
LEFT JOIN public.app_user u ON u.email = r.email
WHERE u.id IS NOT NULL
ON CONFLICT (id) DO NOTHING;

-- Reservations
INSERT INTO public.reservation (id, reservation_date, withdrawal_date, description, observation, user_id)
SELECT id, data_reserva::timestamptz, data_retirada::timestamptz, descricao, observacao, usuario_id
FROM dblink('src', '
  SELECT id, data_reserva, data_retirada, descricao, observacao, usuario_id
  FROM public.reserva
') AS t(id bigint, data_reserva date, data_retirada date,
        descricao varchar, observacao varchar, usuario_id bigint)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.reservation_item (id, reservation_id, item_id, quantity)
SELECT id, reserva_id, item_id, qtde
FROM dblink('src', '
  SELECT id, reserva_id, item_id, qtde FROM public.reserva_item
') AS t(id bigint, reserva_id bigint, item_id bigint, qtde numeric)
ON CONFLICT (id) DO NOTHING;

-- Loans
INSERT INTO public.loan (id, loan_date, deadline, user_id, observation, status)
SELECT id,
       data_emprestimo::timestamptz,
       prazo_devolucao::timestamptz,
       usuario_emprestimo_id,
       observacao,
       CASE
         WHEN data_devolucao IS NOT NULL THEN 'COMPLETED'
         WHEN prazo_devolucao IS NOT NULL AND prazo_devolucao < CURRENT_DATE THEN 'OVERDUE'
         ELSE 'ONGOING'
       END
FROM dblink('src', '
  SELECT id, data_emprestimo, prazo_devolucao, usuario_emprestimo_id,
         observacao, data_devolucao
  FROM public.emprestimo
') AS t(id bigint, data_emprestimo date, prazo_devolucao date,
        usuario_emprestimo_id bigint, observacao varchar, data_devolucao date)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.loan_item (id, loan_id, item_id, quantity, "return")
SELECT ei.id, ei.emprestimo_id, ei.item_id, ei.qtde,
       (ed.item_id IS NOT NULL) AS returned
FROM dblink('src', '
  SELECT id, emprestimo_id, item_id, qtde FROM public.emprestimo_item
') AS ei(id bigint, emprestimo_id bigint, item_id bigint, qtde numeric)
LEFT JOIN dblink('src', '
  SELECT emprestimo_id, item_id FROM public.emprestimo_devolucao_item
') AS ed(emprestimo_id bigint, item_id bigint)
  ON ed.emprestimo_id = ei.emprestimo_id AND ed.item_id = ei.item_id
ON CONFLICT (id) DO NOTHING;

-- Returns (grouped per emprestimo)
INSERT INTO public.return (id, loan_id, return_date, observation)
SELECT DISTINCT e.id AS id, e.id AS loan_id,
       COALESCE(e.data_devolucao, e.prazo_devolucao)::timestamptz AS return_date,
       e.observacao
FROM dblink('src', '
  SELECT e.id, e.data_devolucao, e.prazo_devolucao, e.observacao
  FROM public.emprestimo e
  JOIN public.emprestimo_devolucao_item edi ON edi.emprestimo_id = e.id
') AS e(id bigint, data_devolucao date, prazo_devolucao date, observacao varchar)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.return_item (id, return_id, item_id, quantity_issued, quantity_returned)
SELECT edi.id, edi.emprestimo_id, edi.item_id,
       ei.qtde AS quantity_issued,
       edi.qtde AS quantity_returned
FROM dblink('src', '
  SELECT id, emprestimo_id, item_id, qtde FROM public.emprestimo_devolucao_item
') AS edi(id bigint, emprestimo_id bigint, item_id bigint, qtde numeric)
LEFT JOIN dblink('src', '
  SELECT emprestimo_id, item_id, qtde FROM public.emprestimo_item
') AS ei(emprestimo_id bigint, item_id bigint, qtde numeric)
  ON ei.emprestimo_id = edi.emprestimo_id AND ei.item_id = edi.item_id
ON CONFLICT (id) DO NOTHING;

-- Issues (saida)
INSERT INTO public.issue (id, date, loan_id, user_id, observation)
SELECT id, data_saida::timestamptz, emprestimo_id, usuario_id, observacao
FROM dblink('src', '
  SELECT id, data_saida, emprestimo_id, usuario_id, observacao FROM public.saida
') AS t(id bigint, data_saida date, emprestimo_id bigint, usuario_id bigint, observacao varchar)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.issue_item (id, issue_id, item_id, quantity)
SELECT id, saida_id, item_id, qtde
FROM dblink('src', '
  SELECT id, saida_id, item_id, qtde FROM public.saida_item
') AS t(id bigint, saida_id bigint, item_id bigint, qtde numeric)
ON CONFLICT (id) DO NOTHING;

-- Purchases
INSERT INTO public.purchase (id, date, fornecedor_id, user_id)
SELECT id, data_compra::timestamptz, fornecedor_id, usuario_id
FROM dblink('src', '
  SELECT id, data_compra, fornecedor_id, usuario_id FROM public.compra
') AS t(id bigint, data_compra date, fornecedor_id bigint, usuario_id bigint)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.purchase_item (id, purchase_id, item_id, quantity, price)
SELECT id, compra_id, item_id, qtde, valor
FROM dblink('src', '
  SELECT id, compra_id, item_id, qtde, valor FROM public.compra_item
') AS t(id bigint, compra_id bigint, item_id bigint, qtde numeric, valor numeric)
ON CONFLICT (id) DO NOTHING;

-- Solicitations
INSERT INTO public.solicitation (id, date, user_id, description, observation)
SELECT id, data_solicitacao::timestamptz, usuario_id, descricao, observacao
FROM dblink('src', '
  SELECT id, data_solicitacao, usuario_id, descricao, observacao FROM public.solicitacao
') AS t(id bigint, data_solicitacao date, usuario_id bigint, descricao varchar, observacao varchar)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.solicitation_item (id, solicitation_id, item_id, quantity)
SELECT id, solicitacao_id, item_id, qtde
FROM dblink('src', '
  SELECT id, solicitacao_id, item_id, qtde FROM public.solicitacao_item
') AS t(id bigint, solicitacao_id bigint, item_id bigint, qtde numeric)
ON CONFLICT (id) DO NOTHING;

-- Disconnect
SELECT dblink_disconnect('src');

-- Reset sequences to max(id)
DO $$
DECLARE
  r record;
  seq text;
BEGIN
  FOR r IN SELECT unnest(ARRAY['fornecedor','category','item','item_image',
                              'inventory','asset',
                              'app_user','user_recovery',
                              'reservation','reservation_item',
                              'loan','loan_item',
                              'return','return_item',
                              'issue','issue_item',
                              'purchase','purchase_item',
                              'solicitation','solicitation_item']) AS tbl
  LOOP
    seq := pg_get_serial_sequence(format('public.%I', r.tbl), 'id');
    IF seq IS NOT NULL THEN
      EXECUTE format('SELECT setval(%s, (SELECT COALESCE(MAX(id), 1) FROM public.%I), true)',
                     quote_literal(seq), r.tbl);
    END IF;
  END LOOP;
END$$;

COMMIT;
\echo 'Migration completed'
