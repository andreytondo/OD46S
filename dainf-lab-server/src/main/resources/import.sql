-- Teste123456!
INSERT INTO app_user (documento, email, email_verificado, foto_url, nome, "password", telefone, role, enabled) VALUES('2343185', 'andreytondo@alunos.utfpr.edu.br', false, NULL, 'Andrey Tondo', '$2a$10$PAT0Rh1KBwjnqaWvGKQgou5Mkjz1iIFJoasd1R9O.V546opfKmXrm', '46991379026', 'ROLE_ADMIN', true);
INSERT INTO app_user (documento, email, email_verificado, foto_url, nome, "password", telefone, role, enabled) VALUES('2343185', 'pedrozorel@alunos.utfpr.edu.br', false, NULL, 'Pedro Zorel', '$2a$10$PAT0Rh1KBwjnqaWvGKQgou5Mkjz1iIFJoasd1R9O.V546opfKmXrm', '46991379026', 'ROLE_ADMIN', true);
INSERT INTO app_user (documento, email, email_verificado, foto_url, nome, "password", telefone, role, enabled) VALUES('2343185', 'brunoruaro@alunos.utfpr.edu.br', false, NULL, 'Bruno Ruaro', '$2a$10$PAT0Rh1KBwjnqaWvGKQgou5Mkjz1iIFJoasd1R9O.V546opfKmXrm', '46991379026', 'ROLE_ADMIN', true);
INSERT INTO app_user (documento, email, email_verificado, foto_url, nome, "password", telefone, role, enabled) VALUES('2343185', 'felipevilhalva@alunos.utfpr.edu.br', false, NULL, 'Felipe Vilhalva', '$2a$10$PAT0Rh1KBwjnqaWvGKQgou5Mkjz1iIFJoasd1R9O.V546opfKmXrm', '46991379026', 'ROLE_ADMIN', true);
INSERT INTO app_user (documento, email, email_verificado, foto_url, nome, "password", telefone, role, enabled) VALUES('2343185', 'rafaelabandeira@alunos.utfpr.edu.br', false, NULL, 'Rafaela Bandeira', '$2a$10$PAT0Rh1KBwjnqaWvGKQgou5Mkjz1iIFJoasd1R9O.V546opfKmXrm', '46991379026', 'ROLE_ADMIN', true);
INSERT INTO app_user (documento, email, email_verificado, foto_url, nome, "password", telefone, role, enabled) VALUES('2343185', 'renancezarotto@alunos.utfpr.edu.br', false, NULL, 'Renan Cezarotto', '$2a$10$PAT0Rh1KBwjnqaWvGKQgou5Mkjz1iIFJoasd1R9O.V546opfKmXrm', '46991379026', 'ROLE_ADMIN', true);
INSERT INTO app_user (documento, email, email_verificado, foto_url, nome, "password", telefone, role, enabled) VALUES('2343185', 'aluno@alunos.utfpr.edu.br', false, NULL, 'Aluno UTFPR', '$2a$10$PAT0Rh1KBwjnqaWvGKQgou5Mkjz1iIFJoasd1R9O.V546opfKmXrm', '46991379026', 'ROLE_STUDENT', true);
INSERT INTO app_user (documento, email, email_verificado, foto_url, nome, "password", telefone, role, enabled) VALUES('2343185', 'tecnico@alunos.utfpr.edu.br', false, NULL, 'Técnico UTFPR', '$2a$10$PAT0Rh1KBwjnqaWvGKQgou5Mkjz1iIFJoasd1R9O.V546opfKmXrm', '46991379026', 'ROLE_LAB_TECHNICIAN', true);
INSERT INTO app_user (documento, email, email_verificado, foto_url, nome, "password", telefone, role, enabled) VALUES('2343185', 'professor@alunos.utfpr.edu.br', false, NULL, 'Professor UTFPR', '$2a$10$PAT0Rh1KBwjnqaWvGKQgou5Mkjz1iIFJoasd1R9O.V546opfKmXrm', '46991379026', 'ROLE_PROFESSOR', true);
INSERT INTO app_user (documento, email, email_verificado, foto_url, nome, "password", telefone, role, enabled) VALUES('2343185', 'inativo@alunos.utfpr.edu.br', false, NULL, 'Inativo UTFPR', '$2a$10$PAT0Rh1KBwjnqaWvGKQgou5Mkjz1iIFJoasd1R9O.V546opfKmXrm', '46991379026', 'ROLE_PROFESSOR', false);
insert into pais (nome, sigla) values('Brasil', 'BR');
insert into pais (nome, sigla) values('China', 'CN');
insert into pais (nome, sigla) values('Estados Unidos', 'EUA');
INSERT INTO cidade (estado, nome) VALUES('PR', 'Pato Branco');
INSERT INTO cidade (estado, nome) VALUES('PR', 'Francisco Beltrão');
INSERT INTO cidade (estado, nome) VALUES('PR', 'Coronel Vivida');
INSERT INTO cidade (estado, nome) VALUES('SC', 'Chapecó');

-- categorias
INSERT INTO category (description, icon, parent_id) VALUES('Ferramentas', 'pi pi-cog', NULL);
INSERT INTO category (description, icon, parent_id) VALUES('Componentes', 'pi pi-microchip', NULL);
INSERT INTO category (description, icon, parent_id) VALUES('Raspberry Pi', 'pi pi-desktop', NULL);
INSERT INTO category (description, icon, parent_id) VALUES('Arduino', 'pi pi-code', NULL);
INSERT INTO category (description, icon, parent_id) VALUES('Periféricos', 'pi pi-table', NULL);
INSERT INTO category (description, icon, parent_id) VALUES('Cabos', 'pi pi-link', NULL);
INSERT INTO category (description, icon, parent_id) VALUES('Prototipagem', 'pi pi-th-large', NULL);
INSERT INTO category (description, icon, parent_id) VALUES('Bateria e Carregadores', 'pi pi-bolt', NULL);
INSERT INTO category (description, icon, parent_id) VALUES('Motores', 'pi pi-car', NULL);
INSERT INTO category (description, icon, parent_id) VALUES('Material Expediente', 'pi pi-file', NULL);
INSERT INTO category (description, icon, parent_id) VALUES('Impressora 3D', 'pi pi-cog', NULL);
INSERT INTO category (description, icon, parent_id) VALUES('Lego', 'pi pi-th-large', NULL);
INSERT INTO category (description, icon, parent_id) VALUES('Mobilia', 'pi pi-table', NULL);
INSERT INTO category (description, icon, parent_id) VALUES('Displays e Iluminação ', 'pi pi-lightbulb', NULL);
INSERT INTO category (description, icon, parent_id) VALUES('Acessórios', 'pi pi-box', NULL);

-- subcategorias
INSERT INTO category (description, icon, parent_id) VALUES('Manuais', 'pi pi-wrench', 1);
INSERT INTO category (description, icon, parent_id) VALUES('Soldagem', 'pi pi-hammer', 1);
INSERT INTO category (description, icon, parent_id) VALUES('Elétricas', 'pi pi-bolt', 1);
INSERT INTO category (description, icon, parent_id) VALUES('Potenciômetros', 'pi pi-sliders-h', 2);
INSERT INTO category (description, icon, parent_id) VALUES('Sensores', 'pi pi-eye', 2);
INSERT INTO category (description, icon, parent_id) VALUES('Drivers', 'pi pi-file-check', 2);
INSERT INTO category (description, icon, parent_id) VALUES('Resistores', 'pi pi-minus', 2);
INSERT INTO category (description, icon, parent_id) VALUES('Circuitos Integrados', 'pi pi-microchip', 2);
INSERT INTO category (description, icon, parent_id) VALUES('Transistores', 'pi pi-arrows-h', 2);
INSERT INTO category (description, icon, parent_id) VALUES('Botões e Chaves', 'pi pi-power-off', 2);
INSERT INTO category (description, icon, parent_id) VALUES('Diodos', 'pi pi-arrow-right', 2);
INSERT INTO category (description, icon, parent_id) VALUES('Microcontroladores', 'pi pi-code', 2);
INSERT INTO category (description, icon, parent_id) VALUES('Capacitores', 'pi pi-cloud', 2);
INSERT INTO category (description, icon, parent_id) VALUES('Reguladores de Tensão', 'pi pi-ellipsis-h', 2);
INSERT INTO category (description, icon, parent_id) VALUES('Conectores', 'pi pi-sliders-v', 2);
INSERT INTO category (description, icon, parent_id) VALUES('Atuadores e Relés', 'pi pi-link', 2);
INSERT INTO category (description, icon, parent_id) VALUES('Módulos e Conversores', 'pi pi-sync', 2);
INSERT INTO category (description, icon, parent_id) VALUES('Placas', 'pi pi-sitemap', 3);
INSERT INTO category (description, icon, parent_id) VALUES('Acessórios', 'pi pi-box', 3);
INSERT INTO category (description, icon, parent_id) VALUES('Shields', 'pi pi-inbox', 4);
INSERT INTO category (description, icon, parent_id) VALUES('Placas', 'pi pi-sitemap', 4);
INSERT INTO category (description, icon, parent_id) VALUES('Drivers', 'pi pi-file-check', 9);
INSERT INTO category (description, icon, parent_id) VALUES('Servo Motor', 'pi pi-compass', 9);
INSERT INTO category (description, icon, parent_id) VALUES('LEDs', 'pi pi-sun', 14);
INSERT INTO category (description, icon, parent_id) VALUES('Displays', 'pi pi-desktop', 14);

-- fornecedor
INSERT INTO fornecedor (cnpj, email, endereco, estado, ie, nome_fantasia, observacao, razao_social, telefone, cidade_id, cep) VALUES('05982200000100', 'ids@ids.inf.br', 'Avenida Brasil 922', 'PR', null, 'IDS Software e Assessoria', NULL, 'IDS Desenvolvimento de Software e Assessoria Ltda', '554632258383', 1, NULL);
INSERT INTO fornecedor (cnpj, email, endereco, estado, ie, nome_fantasia, observacao, razao_social, telefone, cidade_id, cep) VALUES('12345678000199', 'contato@eletroparts.com', 'Rua das Peças 100', 'SC', null, 'Eletro Parts', NULL, 'Comércio de Eletrônicos Eletro Parts Ltda', '554933221100', 4, NULL);


-- item
insert into item (name, description, price, category_id, type) values('Tesoura', null, 18.90, 16, 'DURABLE');
insert into item (name, description, price, category_id, type) values('Sugador de solda', null, 27.95, 17, 'DURABLE');
insert into item (name, description, price, category_id, type) values('Cabo P2', null, 15.00, 6, 'CONSUMABLE');
insert into item (name, description, price, category_id, type) values('HD Externo Seagate', '1TB - Stgx1000400', 409.00, 5, 'DURABLE');
insert into item (name, description, price, category_id, type) values('Arduino Uno R3', 'Placa de desenvolvimento', 120.00, 37, 'DURABLE');
insert into item (name, description, price, category_id, type) values('Resistor 1k ohm', 'Pacote com 100', 5.00, 22, 'CONSUMABLE');
insert into item (name, description, price, category_id, type) values('Alicate de Corte', '5 polegadas', 35.70, 18, 'DURABLE');
insert into item (name, description, price, category_id, type) values('Raspberry Pi 4', '4GB RAM', 450.00, 34, 'DURABLE');
insert into item (name, description, price, category_id, type) values('Protoboard 830 Furos', null, 25.00, 7, 'CONSUMABLE');
insert into item (name, description, price, category_id, type) values('Display LCD 16x2', 'Backlight Azul', 19.90, 40, 'CONSUMABLE');
insert into item (name, description, price, category_id, type) values('Cabo HDMI', '2 metros, 4K', 45.00, 6, 'CONSUMABLE');
insert into item (name, description, price, category_id, type) values('Mouse USB Logitech', 'M90', 39.90, 5, 'DURABLE');
insert into item (name, description, price, category_id, type) values('Teclado USB Dell', 'KB216', 79.90, 5, 'DURABLE');
insert into item (name, description, price, category_id, type) values('Fonte 5V 3A', 'Pino P4', 29.90, 8, 'CONSUMABLE');
insert into item (name, description, price, category_id, type) values('Osciloscópio Digital', 'Rigol DS1054Z 50MHz', 2890.00, 18, 'DURABLE');
insert into item (name, description, price, category_id, type) values('Caneta Marcador Permanente', 'Preta', 4.50, 10, 'CONSUMABLE');
insert into item (name, description, price, category_id, type) values('Pacote Papel Sulfite A4', '500 folhas', 28.90, 10, 'CONSUMABLE');
insert into item (name, description, price, category_id, type) values('Estação de Solda', 'Yaxun 881D', 350.00, 17, 'DURABLE');
insert into item (name, description, price, category_id, type) values('LED Difuso 5mm', 'Vermelho - Pct c/ 50', 8.00, 40, 'CONSUMABLE');
insert into item (name, description, price, category_id, type) values('LED Difuso 5mm', 'Verde - Pct c/ 50', 8.00, 40, 'CONSUMABLE');
insert into item (name, description, price, category_id, type) values('Sensor Ultrassônico HC-SR04', null, 15.00, 20, 'CONSUMABLE');
insert into item (name, description, price, category_id, type) values('Servo Motor SG90', '9g', 18.00, 39, 'CONSUMABLE');
insert into item (name, description, price, category_id, type) values('Módulo Relé 2 Canais', '5V', 12.50, 32, 'CONSUMABLE');
insert into item (name, description, price, category_id, type) values('Filamento PLA 1Kg', 'Branco', 130.00, 11, 'CONSUMABLE');
insert into item (name, description, price, category_id, type) values('Filamento PLA 1Kg', 'Preto', 130.00, 11, 'CONSUMABLE');
insert into item (name, description, price, category_id, type) values('Bateria 9V', 'Alcalina', 9.90, 8, 'CONSUMABLE');
insert into item (name, description, price, category_id, type) values('Cadeira de Escritório', 'Giratória simples', 450.00, 13, 'DURABLE');
insert into item (name, description, price, category_id, type) values('Mesa de Trabalho', '120x60cm', 300.00, 13, 'DURABLE');
insert into item (name, description, price, category_id, type) values('Lâmpada LED Bulbo', '9W Branca', 12.00, 40, 'CONSUMABLE');
insert into item (name, description, price, category_id, type) values('Arduino Nano', 'Com cabos', 45.00, 37, 'DURABLE');


-- asset
INSERT INTO asset (item_id, location, serial_number) values (4, 'V109', '40328');
INSERT INTO asset (item_id, location, serial_number) values (4, 'V108', '40329');
INSERT INTO asset (item_id, location, serial_number) values (4, 'V106', '40330');
INSERT INTO asset (item_id, location, serial_number) values (4, 'V105', '40331');
INSERT INTO asset (item_id, location, serial_number) values (4, 'V104', '40332');
INSERT INTO asset (item_id, location, serial_number) values (5, 'Armário B1', 'ARD-001');
INSERT INTO asset (item_id, location, serial_number) values (5, 'Armário B1', 'ARD-002');
INSERT INTO asset (item_id, location, serial_number) values (5, 'Armário B1', 'ARD-003');
INSERT INTO asset (item_id, location, serial_number) values (8, 'Bancada 01', 'RPI-A-100');
INSERT INTO asset (item_id, location, serial_number) values (8, 'Bancada 01', 'RPI-A-101');
INSERT INTO asset (item_id, location, serial_number) values (8, 'Bancada 02', 'RPI-B-200');
INSERT INTO asset (item_id, location, serial_number) values (8, 'Bancada 02', 'RPI-B-201');
INSERT INTO asset (item_id, location, serial_number) values (8, 'Emprestado', 'RPI-C-300');
INSERT INTO asset (item_id, location, serial_number) values (12, 'V109', 'M-LOG-001');
INSERT INTO asset (item_id, location, serial_number) values (12, 'V109', 'M-LOG-002');
INSERT INTO asset (item_id, location, serial_number) values (12, 'V108', 'M-LOG-003');
INSERT INTO asset (item_id, location, serial_number) values (13, 'V109', 'K-DEL-001');
INSERT INTO asset (item_id, location, serial_number) values (13, 'V109', 'K-DEL-002');
INSERT INTO asset (item_id, location, serial_number) values (13, 'V108', 'K-DEL-003');
INSERT INTO asset (item_id, location, serial_number) values (15, 'Lab Eletrônica', 'RIG-9001');
INSERT INTO asset (item_id, location, serial_number) values (15, 'Lab Eletrônica', 'RIG-9002');
INSERT INTO asset (item_id, location, serial_number) values (18, 'Bancada 01', 'YAX-1001');
INSERT INTO asset (item_id, location, serial_number) values (18, 'Bancada 02', 'YAX-1002');
INSERT INTO asset (item_id, location, serial_number) values (18, 'Bancada 03', 'YAX-1003');
INSERT INTO asset (item_id, location, serial_number) values (18, 'Bancada 04', 'YAX-1004');
INSERT INTO asset (item_id, location, serial_number) values (27, 'Sala Professores', 'CAD-01');
INSERT INTO asset (item_id, location, serial_number) values (27, 'Sala Professores', 'CAD-02');
INSERT INTO asset (item_id, location, serial_number) values (27, 'V109', 'CAD-03');
INSERT INTO asset (item_id, location, serial_number) values (27, 'V109', 'CAD-04');
INSERT INTO asset (item_id, location, serial_number) values (28, 'Sala Professores', 'MES-01');
INSERT INTO asset (item_id, location, serial_number) values (28, 'V109', 'MES-02');
INSERT INTO asset (item_id, location, serial_number) values (30, 'Kit R-01', 'NANO-001');
INSERT INTO asset (item_id, location, serial_number) values (30, 'Kit R-01', 'NANO-002');
INSERT INTO asset (item_id, location, serial_number) values (30, 'Kit R-02', 'NANO-003');
INSERT INTO asset (item_id, location, serial_number) values (30, 'Kit R-02', 'NANO-004');
INSERT INTO asset (item_id, location, serial_number) values (30, 'Kit R-03', 'NANO-005');
INSERT INTO asset (item_id, location, serial_number) values (30, 'Kit R-03', 'NANO-006');
INSERT INTO asset (item_id, location, serial_number) values (30, 'Kit R-04', 'NANO-007');
INSERT INTO asset (item_id, location, serial_number) values (30, 'Kit R-04', 'NANO-008');
INSERT INTO asset (item_id, location, serial_number) values (30, 'Kit R-05', 'NANO-009');
INSERT INTO asset (item_id, location, serial_number) values (30, 'Kit R-05', 'NANO-010');


-- purchase
INSERT INTO purchase ("date",fornecedor_id,user_id) VALUES ('2025-10-29 13:29:00',1,1);
INSERT INTO purchase ("date",fornecedor_id,user_id) VALUES ('2025-10-30 23:43:25',1,1);
INSERT INTO purchase ("date",fornecedor_id,user_id) VALUES ('2025-11-01 10:00:00',1,9);
INSERT INTO purchase ("date",fornecedor_id,user_id) VALUES ('2025-11-02 11:30:00',1,8);
INSERT INTO purchase ("date",fornecedor_id,user_id) VALUES ('2025-11-03 14:00:00',1,3);
INSERT INTO purchase ("date",fornecedor_id,user_id) VALUES ('2025-11-04 09:15:00',1,1);
INSERT INTO purchase ("date",fornecedor_id,user_id) VALUES ('2025-11-05 16:45:00',1,2);
INSERT INTO purchase ("date",fornecedor_id,user_id) VALUES ('2025-11-05 17:00:00',1,8);
INSERT INTO purchase ("date",fornecedor_id,user_id) VALUES ('2025-11-06 10:10:00',2,8);
INSERT INTO purchase ("date",fornecedor_id,user_id) VALUES ('2025-11-06 11:00:00',1,1);
INSERT INTO purchase ("date",fornecedor_id,user_id) VALUES ('2025-11-07 09:30:00',2,9);
INSERT INTO purchase ("date",fornecedor_id,user_id) VALUES ('2025-11-07 14:00:00',1,8);
INSERT INTO purchase ("date",fornecedor_id,user_id) VALUES ('2025-11-08 10:00:00',1,4);
INSERT INTO purchase ("date",fornecedor_id,user_id) VALUES ('2025-11-10 09:00:00',2,8);
INSERT INTO purchase ("date",fornecedor_id,user_id) VALUES ('2025-11-10 14:30:00',1,9);
INSERT INTO purchase ("date",fornecedor_id,user_id) VALUES ('2025-11-11 11:00:00',2,3);
INSERT INTO purchase ("date",fornecedor_id,user_id) VALUES ('2025-11-12 08:45:00',1,5);
INSERT INTO purchase ("date",fornecedor_id,user_id) VALUES ('2025-11-12 10:20:00',1,8);
INSERT INTO purchase ("date",fornecedor_id,user_id) VALUES ('2025-11-13 13:00:00',2,1);
INSERT INTO purchase ("date",fornecedor_id,user_id) VALUES ('2025-11-14 10:00:00',1,8);
INSERT INTO purchase ("date",fornecedor_id,user_id) VALUES ('2025-11-15 11:00:00',2,9);
INSERT INTO purchase ("date",fornecedor_id,user_id) VALUES ('2025-11-17 09:30:00',1,7);
INSERT INTO purchase ("date",fornecedor_id,user_id) VALUES ('2025-11-18 14:50:00',1,8);
INSERT INTO purchase ("date",fornecedor_id,user_id) VALUES ('2025-11-19 10:00:00',2,2);
INSERT INTO purchase ("date",fornecedor_id,user_id) VALUES ('2025-11-20 16:00:00',1,8);


-- purchase_item
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (18.90,90.00,1,1);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (18.90,10.00,1,1);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (15.00,103.00,3,2);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (120.00, 3.00, 5, 3);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (5.00, 50.00, 6, 4);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (35.70, 90.00, 7, 5);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (27.95, 90.00, 2, 6);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (450.00, 5.00, 8, 7);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (25.00, 82.00, 9, 8);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (19.90, 92.00, 10, 8);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (39.90, 3.00, 12, 9);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (79.90, 3.00, 13, 9);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (45.00, 100.00, 11, 10);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (29.90, 94.00, 14, 10);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (2890.00, 2.00, 15, 11);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (350.00, 4.00, 18, 12);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (4.50, 100.00, 16, 13);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (28.90, 100.00, 17, 13);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (8.00, 100.00, 19, 14);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (8.00, 102.00, 20, 14);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (15.00, 90.00, 21, 14);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (18.00, 80.00, 22, 15);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (12.50, 100.00, 23, 15);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (130.00, 90.00, 24, 16);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (130.00, 100.00, 25, 16);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (450.00, 4.00, 27, 17);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (300.00, 2.00, 28, 17);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (45.00, 10.00, 30, 18);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (9.90, 110.00, 26, 19);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (12.00, 100.00, 29, 19);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (35.70, 10.00, 7, 20);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (27.95, 10.00, 2, 20);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (450.00, 2.00, 8, 21);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (5.00, 50.00, 6, 22);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (25.00, 20.00, 9, 22);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (29.90, 10.00, 14, 23);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (19.90, 10.00, 10, 23);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (130.00, 10.00, 24, 24);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (15.00, 20.00, 21, 25);
INSERT INTO purchase_item (price, quantity, item_id, purchase_id) VALUES (18.00, 20.00, 22, 25);


-- inventory
INSERT INTO inventory (quantity,item_id) VALUES (100.00,1);
INSERT INTO inventory (quantity,item_id) VALUES (100.00,3);
INSERT INTO inventory (quantity,item_id) VALUES (100.00, 6);
INSERT INTO inventory (quantity,item_id) VALUES (100.00, 7);
INSERT INTO inventory (quantity,item_id) VALUES (100.00, 2);
INSERT INTO inventory (quantity,item_id) VALUES (100.00, 9);
INSERT INTO inventory (quantity,item_id) VALUES (100.00, 10);
INSERT INTO inventory (quantity,item_id) VALUES (100.00, 11);
INSERT INTO inventory (quantity,item_id) VALUES (100.00, 14);
INSERT INTO inventory (quantity,item_id) VALUES (100.00, 16);
INSERT INTO inventory (quantity,item_id) VALUES (100.00, 17);
INSERT INTO inventory (quantity,item_id) VALUES (100.00, 19);
INSERT INTO inventory (quantity,item_id) VALUES (100.00, 20);
INSERT INTO inventory (quantity,item_id) VALUES (100.00, 21);
INSERT INTO inventory (quantity,item_id) VALUES (100.00, 22);
INSERT INTO inventory (quantity,item_id) VALUES (100.00, 23);
INSERT INTO inventory (quantity,item_id) VALUES (100.00, 24);
INSERT INTO inventory (quantity,item_id) VALUES (100.00, 25);
INSERT INTO inventory (quantity,item_id) VALUES (100.00, 26);
INSERT INTO inventory (quantity,item_id) VALUES (100.00, 29);


-- inventory_transaction
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (90.00,'PURCHASE','2025-10-29 13:29:00',1,1);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (10.00,'PURCHASE','2025-10-29 13:29:00',1,1);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (103.00,'PURCHASE','2025-10-30 23:43:25',2,1);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (5.00,'LOAN','2025-10-30 23:53:15',2,1);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (50.00,'PURCHASE','2025-11-02 11:30:00',3,8);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (50.00,'PURCHASE','2025-11-17 09:30:00',3,7);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (90.00,'PURCHASE','2025-11-03 14:00:00',4,3);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (10.00,'PURCHASE','2025-11-14 10:00:00',4,8);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (90.00,'PURCHASE','2025-11-04 09:15:00',5,1);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (2.00,'LOAN','2025-11-04 10:00:00',5,1);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (10.00,'PURCHASE','2025-11-14 10:00:00',5,8);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (82.00,'PURCHASE','2025-11-05 17:00:00',6,8);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (5.00,'LOAN','2025-11-06 09:00:00',6,7);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (2.00,'LOAN','2025-11-10 09:30:00',6,7);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (20.00,'PURCHASE','2025-11-17 09:30:00',6,7);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (92.00,'PURCHASE','2025-11-05 17:00:00',7,8);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (10.00,'PURCHASE','2025-11-18 14:50:00',7,8);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (2.00,'LOAN','2025-11-11 10:00:00',7,7);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (100.00,'PURCHASE','2025-11-06 11:00:00',8,1);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (94.00,'PURCHASE','2025-11-06 11:00:00',9,1);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (10.00,'PURCHASE','2025-11-18 14:50:00',9,8);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (5.00,'LOAN','2025-11-12 14:00:00',9,9);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (100.00,'PURCHASE','2025-11-08 10:00:00',10,4);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (100.00,'PURCHASE','2025-11-08 10:00:00',11,4);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (100.00,'PURCHASE','2025-11-10 09:00:00',12,8);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (102.00,'PURCHASE','2025-11-10 09:00:00',13,8);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (2.00,'LOAN','2025-11-13 10:30:00',13,7);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (90.00,'PURCHASE','2025-11-10 09:00:00',14,8);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (10.00,'LOAN','2025-11-15 09:00:00',14,7);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (20.00,'PURCHASE','2025-11-20 16:00:00',14,8);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (80.00,'PURCHASE','2025-11-10 14:30:00',15,9);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (10.00,'LOAN','2025-11-15 09:00:00',15,7);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (20.00,'PURCHASE','2025-11-20 16:00:00',15,8);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (100.00,'PURCHASE','2025-11-10 14:30:00',16,9);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (90.00,'PURCHASE','2025-11-11 11:00:00',17,3);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (10.00,'PURCHASE','2025-11-19 10:00:00',17,2);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (100.00,'PURCHASE','2025-11-11 11:00:00',18,3);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (110.00,'PURCHASE','2025-11-13 13:00:00',19,1);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (10.00,'LOAN','2025-11-18 10:00:00',19,7);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (100.00,'PURCHASE','2025-11-13 13:00:00',20,1);


-- solicitation
INSERT INTO solicitation ("date",user_id,description,observation) VALUES ('2025-10-30 23:50:39',1,NULL,NULL);
INSERT INTO solicitation ("date",user_id,description,observation) VALUES ('2025-11-01 08:30:00', 9, 'Solicitação de Alicates de Corte para Lab V109', 'Urgente');
INSERT INTO solicitation ("date",user_id,description,observation) VALUES ('2025-11-02 15:00:00', 7, 'Displays de LCD para TCC', NULL);
INSERT INTO solicitation ("date",user_id,description,observation) VALUES ('2025-11-06 09:00:00', 7, 'Kits Arduino Nano para aula de Robótica', NULL);
INSERT INTO solicitation ("date",user_id,description,observation) VALUES ('2025-11-07 11:00:00', 9, 'Filamento para Impressora 3D', 'Preto e Branco');
INSERT INTO solicitation ("date",user_id,description,observation) VALUES ('2025-11-08 14:00:00', 8, 'Reposição material de escritório', 'Canetas e Sulfite');
INSERT INTO solicitation ("date",user_id,description,observation) VALUES ('2025-11-10 10:00:00', 7, 'Sensores para projeto final', 'HC-SR04 e Servos');
INSERT INTO solicitation ("date",user_id,description,observation) VALUES ('2025-11-11 09:30:00', 3, 'Compra de novas estações de solda', 'As atuais estão ruins');
INSERT INTO solicitation ("date",user_id,description,observation) VALUES ('2025-11-12 16:00:00', 5, 'Novas cadeiras para sala dos professores', NULL);
INSERT INTO solicitation ("date",user_id,description,observation) VALUES ('2025-11-13 10:00:00', 8, 'Reposição de lâmpadas Lab V108', 'Queimadas');
INSERT INTO solicitation ("date",user_id,description,observation) VALUES ('2025-11-14 11:30:00', 7, 'Mais resistores 1k', 'Estoque baixo');
INSERT INTO solicitation ("date",user_id,description,observation) VALUES ('2025-11-15 10:00:00', 9, 'Compra de mais Raspberry Pi 4', 'Para projeto de IA');
INSERT INTO solicitation ("date",user_id,description,observation) VALUES ('2025-11-17 14:00:00', 7, 'Módulos Relé', NULL);
INSERT INTO solicitation ("date",user_id,description,observation) VALUES ('2025-11-18 09:00:00', 8, 'Fontes 5V extras', 'Muitos projetos usando');
INSERT INTO solicitation ("date",user_id,description,observation) VALUES ('2025-11-19 13:20:00', 7, 'LEDs coloridos', 'Vermelho e Verde');
INSERT INTO solicitation ("date",user_id,description,observation) VALUES ('2025-11-20 10:00:00', 9, 'Osciloscópio extra', 'Um é pouco');
INSERT INTO solicitation ("date",user_id,description,observation) VALUES ('2025-11-21 09:00:00', 8, 'Mouse e Teclado p/ Bancada 3', NULL);
INSERT INTO solicitation ("date",user_id,description,observation) VALUES ('2025-11-22 15:00:00', 7, 'Baterias 9V', 'Projeto carrinho');
INSERT INTO solicitation ("date",user_id,description,observation) VALUES ('2025-11-24 10:00:00', 1, 'HD Externo para Backup', NULL);
INSERT INTO solicitation ("date",user_id,description,observation) VALUES ('2025-11-25 11:00:00', 3, 'Mais filamento branco', 'Impressão de protótipos');


-- solicitation_item
INSERT INTO solicitation_item (quantity,item_id,solicitation_id) VALUES (10.00,2,1);
INSERT INTO solicitation_item (quantity,item_id,solicitation_id) VALUES (5.00, 7, 2);
INSERT INTO solicitation_item (quantity,item_id,solicitation_id) VALUES (8.00, 10, 3);
INSERT INTO solicitation_item (quantity,item_id,solicitation_id) VALUES (10.00, 30, 4);
INSERT INTO solicitation_item (quantity,item_id,solicitation_id) VALUES (5.00, 24, 5);
INSERT INTO solicitation_item (quantity,item_id,solicitation_id) VALUES (5.00, 25, 5);
INSERT INTO solicitation_item (quantity,item_id,solicitation_id) VALUES (50.00, 16, 6);
INSERT INTO solicitation_item (quantity,item_id,solicitation_id) VALUES (10.00, 17, 6);
INSERT INTO solicitation_item (quantity,item_id,solicitation_id) VALUES (20.00, 21, 7);
INSERT INTO solicitation_item (quantity,item_id,solicitation_id) VALUES (20.00, 22, 7);
INSERT INTO solicitation_item (quantity,item_id,solicitation_id) VALUES (4.00, 18, 8);
INSERT INTO solicitation_item (quantity,item_id,solicitation_id) VALUES (6.00, 27, 9);
INSERT INTO solicitation_item (quantity,item_id,solicitation_id) VALUES (10.00, 29, 10);
INSERT INTO solicitation_item (quantity,item_id,solicitation_id) VALUES (50.00, 6, 11);
INSERT INTO solicitation_item (quantity,item_id,solicitation_id) VALUES (2.00, 8, 12);
INSERT INTO solicitation_item (quantity,item_id,solicitation_id) VALUES (10.00, 23, 13);
INSERT INTO solicitation_item (quantity,item_id,solicitation_id) VALUES (15.00, 14, 14);
INSERT INTO solicitation_item (quantity,item_id,solicitation_id) VALUES (5.00, 19, 15);
INSERT INTO solicitation_item (quantity,item_id,solicitation_id) VALUES (5.00, 20, 15);
INSERT INTO solicitation_item (quantity,item_id,solicitation_id) VALUES (1.00, 15, 16);
INSERT INTO solicitation_item (quantity,item_id,solicitation_id) VALUES (1.00, 12, 17);
INSERT INTO solicitation_item (quantity,item_id,solicitation_id) VALUES (1.00, 13, 17);
INSERT INTO solicitation_item (quantity,item_id,solicitation_id) VALUES (20.00, 26, 18);
INSERT INTO solicitation_item (quantity,item_id,solicitation_id) VALUES (2.00, 4, 19);
INSERT INTO solicitation_item (quantity,item_id,solicitation_id) VALUES (10.00, 24, 20);


-- loan
INSERT INTO loan (deadline,loan_date,user_id,observation, status) values ('2025-11-30 00:00:00-03','2025-10-30 23:53:15-03',1,NULL, 'ONGOING');
INSERT INTO loan (deadline,loan_date,user_id,observation, status) values ('2025-12-06 00:00:00-03','2025-11-06 09:00:00-03', 7, 'Projeto TCC Aluno', 'ONGOING');
INSERT INTO loan (deadline,loan_date,user_id,observation, status) values ('2025-11-20 00:00:00-03','2025-11-04 10:00:00-03', 1, 'Uso laboratório', 'ONGOING');
INSERT INTO loan (deadline,loan_date,user_id,observation, status) values ('2025-11-20 00:00:00-03','2025-11-10 09:30:00-03', 7, 'Protoboard extra TCC', 'ONGOING');
INSERT INTO loan (deadline,loan_date,user_id,observation, status) values ('2025-11-21 00:00:00-03','2025-11-11 10:00:00-03', 7, 'LCD TCC', 'ONGOING');
INSERT INTO loan (deadline,loan_date,user_id,observation, status) values ('2025-11-22 00:00:00-03','2025-11-12 14:00:00-03', 9, 'Teste fonte Raspberry', 'ONGOING');
INSERT INTO loan (deadline,loan_date,user_id,observation, status) values ('2025-11-23 00:00:00-03','2025-11-13 10:30:00-03', 7, 'LEDs projeto', 'ONGOING');
INSERT INTO loan (deadline,loan_date,user_id,observation, status) values ('2025-11-05 00:00:00-03','2025-10-15 09:00:00-03', 7, 'Kit TCC (Sensores e Servos)', 'OVERDUE');
INSERT INTO loan (deadline,loan_date,user_id,observation, status) values ('2025-11-28 00:00:00-03','2025-11-18 10:00:00-03', 7, 'Baterias p/ carrinho', 'ONGOING');


-- loan_item
INSERT INTO loan_item (quantity,"return",item_id,loan_id) values (5.00,true,3,1);
INSERT INTO loan_item (quantity,"return",item_id,loan_id) values (5.00, true, 9, 2);
INSERT INTO loan_item (quantity,"return",item_id,loan_id) values (2.00, true, 2, 3);
INSERT INTO loan_item (quantity,"return",item_id,loan_id) values (2.00, true, 9, 4);
INSERT INTO loan_item (quantity,"return",item_id,loan_id) values (2.00, true, 10, 5);
INSERT INTO loan_item (quantity,"return",item_id,loan_id) values (5.00, true, 14, 6);
INSERT INTO loan_item (quantity,"return",item_id,loan_id) values (2.00, true, 20, 7);
INSERT INTO loan_item (quantity,"return",item_id,loan_id) values (10.00, true, 21, 8);
INSERT INTO loan_item (quantity,"return",item_id,loan_id) values (10.00, true, 22, 8);
INSERT INTO loan_item (quantity,"return",item_id,loan_id) values (10.00, true, 26, 9);


-- reservation
INSERT INTO reservation (id, description, reservation_date, withdrawal_date, user_id) VALUES (1, 'Reserva TCC', '2025-11-25 10:00:00-03', '2025-11-26 10:00:00-03', 7);
INSERT INTO reservation (id, description, reservation_date, withdrawal_date, user_id) VALUES (2, 'Reserva Aula Robótica', '2025-11-26 11:00:00-03', '2025-11-28 08:00:00-03', 9);
INSERT INTO reservation (id, description, reservation_date, user_id) VALUES (3, 'Reserva Lab Eletronica', '2025-11-27 14:00:00-03', 8);
INSERT INTO reservation (id, description, reservation_date, withdrawal_date, user_id) VALUES (4, 'Reserva Impressora 3D', '2025-11-28 09:00:00-03', '2025-11-28 13:00:00-03', 3);
INSERT INTO reservation (id, description, reservation_date, user_id) VALUES (5, 'Reserva materiais básicos', '2025-11-28 10:00:00-03', 7);

-- reservation_item
INSERT INTO reservation_item (quantity, item_id, reservation_id) VALUES (2.00, 8, 1);
INSERT INTO reservation_item (quantity, item_id, reservation_id) VALUES (5.00, 21, 1);
INSERT INTO reservation_item (quantity, item_id, reservation_id) VALUES (10.00, 30, 2);
INSERT INTO reservation_item (quantity, item_id, reservation_id) VALUES (10.00, 9, 2);
INSERT INTO reservation_item (quantity, item_id, reservation_id) VALUES (1.00, 15, 3);
INSERT INTO reservation_item (quantity, item_id, reservation_id) VALUES (1.00, 24, 4);
INSERT INTO reservation_item (quantity, item_id, reservation_id) VALUES (1.00, 25, 4);
INSERT INTO reservation_item (quantity, item_id, reservation_id) VALUES (10.00, 6, 5);
INSERT INTO reservation_item (quantity, item_id, reservation_id) VALUES (2.00, 7, 5);


-- return
INSERT INTO "return" (id, loan_id, return_date, observation) VALUES (1, 1, '2025-11-20 09:00:00-03', 'Devolvido 2 de 5 cabos P2.');
INSERT INTO "return" (id, loan_id, return_date, observation) VALUES (2, 3, '2025-11-21 10:00:00-03', 'Devolvido 2 de 2 sugadores.');
INSERT INTO "return" (id, loan_id, return_date, observation) VALUES (3, 8, '2025-11-22 11:00:00-03', 'Devolução parcial TCC. 5 Servos e 5 Sensores.');
INSERT INTO "return" (id, loan_id, return_date, observation) VALUES (4, 2, '2025-11-25 09:00:00-03', 'Devolvido 5 protoboards do Loan 2.');
INSERT INTO "return" (id, loan_id, return_date, observation) VALUES (5, 6, '2025-11-25 10:00:00-03', 'Devolvido 3 de 5 fontes.');
INSERT INTO "return" (id, loan_id, return_date, observation) VALUES (6, 8, '2025-11-26 14:00:00-03', 'Devolução final TCC. 5 Servos restantes. 5 sensores foram perdidos.');

-- return_item
INSERT INTO return_item (return_id, item_id, quantity_returned, quantity_issued) VALUES (1, 3, 2.00, 0.00);
INSERT INTO return_item (return_id, item_id, quantity_returned, quantity_issued) VALUES (2, 2, 2.00, 0.00);
INSERT INTO return_item (return_id, item_id, quantity_returned, quantity_issued) VALUES (3, 22, 5.00, 0.00);
INSERT INTO return_item (return_id, item_id, quantity_returned, quantity_issued) VALUES (3, 21, 5.00, 0.00);
INSERT INTO return_item (return_id, item_id, quantity_returned, quantity_issued) VALUES (4, 9, 5.00, 0.00);
INSERT INTO return_item (return_id, item_id, quantity_returned, quantity_issued) VALUES (5, 14, 3.00, 2.00);
INSERT INTO return_item (return_id, item_id, quantity_returned, quantity_issued) VALUES (6, 22, 5.00, 0.00);
INSERT INTO return_item (return_id, item_id, quantity_returned, quantity_issued) VALUES (6, 21, 0.00, 5.00);


INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (2.00,'RETURN','2025-11-20 09:00:00',2,1);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (2.00,'RETURN','2025-11-21 10:00:00',5,1);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (5.00,'RETURN','2025-11-22 11:00:00',15,7);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (5.00,'RETURN','2025-11-22 11:00:00',14,7);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (5.00,'RETURN','2025-11-25 09:00:00',6,7);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (3.00,'RETURN','2025-11-25 10:00:00',9,9);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (2.00,'ISSUE','2025-11-25 10:00:01',9,9);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (5.00,'RETURN','2025-11-26 14:00:00',15,7);
INSERT INTO inventory_transaction (quantity,"type","date",inventory_id,user_id) VALUES (5.00,'ISSUE','2025-11-26 14:00:01',14,7);

SELECT setval(pg_get_serial_sequence('reservation', 'id'), (SELECT MAX(id) FROM reservation));
SELECT setval(pg_get_serial_sequence('return', 'id'), (SELECT MAX(id) FROM "return"));