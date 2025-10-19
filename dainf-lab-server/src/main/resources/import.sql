-- Teste123456!
INSERT INTO app_user (documento, email, email_verificado, foto_url, nome, "password", telefone, role) VALUES('2343185', 'andreytondo@alunos.utfpr.edu.br', false, NULL, 'Andrey Tondo', '$2a$10$PAT0Rh1KBwjnqaWvGKQgou5Mkjz1iIFJoasd1R9O.V546opfKmXrm', '46991379026', 'ROLE_ADMIN');
INSERT INTO app_user (documento, email, email_verificado, foto_url, nome, "password", telefone, role) VALUES('2343185', 'pedrozorel@alunos.utfpr.edu.br', false, NULL, 'Pedro Zorel', '$2a$10$PAT0Rh1KBwjnqaWvGKQgou5Mkjz1iIFJoasd1R9O.V546opfKmXrm', '46991379026', 'ROLE_ADMIN');
INSERT INTO app_user (documento, email, email_verificado, foto_url, nome, "password", telefone, role) VALUES('2343185', 'brunoruaro@alunos.utfpr.edu.br', false, NULL, 'Bruno Ruaro', '$2a$10$PAT0Rh1KBwjnqaWvGKQgou5Mkjz1iIFJoasd1R9O.V546opfKmXrm', '46991379026', 'ROLE_ADMIN');
INSERT INTO app_user (documento, email, email_verificado, foto_url, nome, "password", telefone, role) VALUES('2343185', 'felipevilhalva@alunos.utfpr.edu.br', false, NULL, 'Felipe Vilhalva', '$2a$10$PAT0Rh1KBwjnqaWvGKQgou5Mkjz1iIFJoasd1R9O.V546opfKmXrm', '46991379026', 'ROLE_ADMIN');
INSERT INTO app_user (documento, email, email_verificado, foto_url, nome, "password", telefone, role) VALUES('2343185', 'rafaelabandeira@alunos.utfpr.edu.br', false, NULL, 'Rafaela Bandeira', '$2a$10$PAT0Rh1KBwjnqaWvGKQgou5Mkjz1iIFJoasd1R9O.V546opfKmXrm', '46991379026', 'ROLE_ADMIN');
INSERT INTO app_user (documento, email, email_verificado, foto_url, nome, "password", telefone, role) VALUES('2343185', 'renancezarotto@alunos.utfpr.edu.br', false, NULL, 'Renan Cezarotto', '$2a$10$PAT0Rh1KBwjnqaWvGKQgou5Mkjz1iIFJoasd1R9O.V546opfKmXrm', '46991379026', 'ROLE_ADMIN');
insert into pais (nome, sigla) values('Brasil', 'BR');
INSERT INTO cidade (estado, nome) VALUES('PR', 'Pato Branco');
INSERT INTO category (description, icon, parent_id) VALUES('Ferramentas', 'pi pi-cog', NULL);
INSERT INTO category (description, icon, parent_id) VALUES('Manuais', 'pi pi-wrench', 1);
INSERT INTO category (description, icon, parent_id) VALUES('Soldagem', 'pi pi-hammer', 1);
INSERT INTO fornecedor (cnpj, email, endereco, estado, ie, nome_fantasia, observacao, razao_social, telefone, cidade_id, cep) VALUES('05982200000100', 'ids@ids.inf.br', 'Avenida Brasil 922', 'PR', null, 'IDS Software e Assessoria', NULL, 'IDS Desenvolvimento de Software e Assessoria Ltda', '554632258383', 1, NULL);
insert into item (name, description, price, category_id) values('Sugador de solda', 'Suga a solda de estanho', 100.50, 2);
INSERT INTO inventory (quantity, item_id) VALUES(10.00, 1);
INSERT INTO inventory_transaction (quantity, "type", "date", inventory_id, user_id) VALUES(10.00, 0, '2025-10-19 18:44:48.560', 1, 1);