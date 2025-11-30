package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.FornecedorDTO;
import br.edu.utfpr.dainf.enums.UnidadeFederativa;
import br.edu.utfpr.dainf.shared.CrudControllerTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.BeforeEach;

class SupplierControllerTest extends CrudControllerTest<FornecedorDTO> {

    @BeforeEach
    protected void setUp() {
    }

    @Override
    protected String getURL() {
        return "/fornecedores";
    }

    @Override
    protected FornecedorDTO createValidObject() {
        return new FornecedorDTO(null, "Fornecedor Teste", "Razão Social Teste", "35258347000113",
                "Rua Teste", "123", "Bairro Teste", "teste@gmail.com", "46999998888", "Pato Branco", UnidadeFederativa.PR);
    }

    @Override
    protected FornecedorDTO createInvalidObject() {
        return new FornecedorDTO(null, "Fornecedor Inválido", "Razão Social Inválida", "352583000113", // Invalid CNPJ
                "Rua Teste", "123", "Bairro Teste", "teste@gmail.com", "46999998888", "Pato Branco", UnidadeFederativa.PR);
    }

    @Override
    protected void onBeforeUpdate(FornecedorDTO dto) {
        dto.setNomeFantasia("Fornecedor Teste Alterado");
    }
}
