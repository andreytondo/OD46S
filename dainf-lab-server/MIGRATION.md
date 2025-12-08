# Migração test_labs → postgres

Este repositório contém o dump `test_labs` e o script `migration.sql` que migra os dados para o schema alvo já existente no banco `postgres` do container `postgres`.

## Pré-requisitos
- Container Postgres em execução: `postgres` (imagem postgres:17, porta 5432 exposta).
- Credenciais padrão do container: usuário `postgres`, senha `postgres`.
- O script `migration.sql` na pasta atual (já gerado por este processo).

## O que o script faz
- Conecta ao banco fonte `test_labs` via `dblink` usando `postgres/postgres` em `127.0.0.1`.
- Trunca tabelas de destino (inclui cascata para `cart`, `cart_item`, `inventory_transaction`) e reinicia identidades.
- Migra dados com transformações:
  - Semeia a taxonomia de categorias igual ao `import.sql` (Ferramentas, Componentes, subcategorias etc.).
  - Mapeia `grupo_id` legado → `category.id` novo conforme a nova taxonomia.
  - Remove tabelas `pais` e `cidade` (se existirem) e converte `fornecedor.cidade` para string.
  - Mapeia tipos de item C/P para CONSUMABLE/DURABLE.
  - Define `bucket='local'` para imagens.
  - Normaliza `telefone` e `email` de fornecedor para string vazia se nulos.
  - Mapeia permissões para roles válidas (ADMIN/PROFESSOR/LAB_TECHNICIAN/STUDENT).
  - Mapeia status de empréstimo para ONGOING/OVERDUE/COMPLETED.
  - Upsert de inventário e reset de sequências para max(id).

## Execução
1) Copiar o script para dentro do container (se ainda não estiver):
   ```bash
   docker cp /home/andrey-tondo/Desktop/test_dainf_labs/migration.sql postgres:/tmp/migration.sql
   ```
2) Rodar o script dentro do container apontando para o banco `postgres`:
   ```bash
   docker exec -i postgres psql -U postgres -f /tmp/migration.sql postgres
   ```

### Executar em um banco novo (ex.: `dainf_migrated`)
1) Criar o banco vazio:
   ```bash
   docker exec -i postgres psql -U postgres -c "CREATE DATABASE dainf_migrated"
   ```
2) Copiar o script (se ainda não estiver):
   ```bash
   docker cp /home/andrey-tondo/Desktop/test_dainf_labs/migration.sql postgres:/tmp/migration.sql
   ```
3) Carregar o schema do banco `postgres` (já possui o schema-alvo) para o novo banco:
   ```bash
   docker exec -i postgres pg_dump -U postgres -s postgres \
     | docker exec -i postgres psql -U postgres -d dainf_migrated
   ```
4) Rodar o script no novo banco:
   ```bash
   docker exec -i postgres psql -U postgres -d dainf_migrated -f /tmp/migration.sql
   ```

> O script alinha o schema antes de migrar dados (remove `pais`/`cidade`, troca `fornecedor.cidade_id` por `cidade` textual), então mesmo que o schema copiado ainda tenha essas tabelas/colunas, elas serão ajustadas na execução.

## Observações
- O script é idempotente no sentido de truncar e recarregar; se precisar preservar dados existentes, remova ou comente o bloco TRUNCATE.
- Se as credenciais ou o host mudarem, ajuste a linha `dblink_connect` no topo do script.
- Audit tables não são populadas; apenas as tabelas principais são carregadas.
