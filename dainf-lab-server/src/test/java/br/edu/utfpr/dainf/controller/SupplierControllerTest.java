package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.FornecedorDTO;
import br.edu.utfpr.dainf.enums.UnidadeFederativa;
import br.edu.utfpr.dainf.model.Cidade;
import br.edu.utfpr.dainf.service.CidadeService;
import br.edu.utfpr.dainf.shared.CrudControllerTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Assertions;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

class SupplierControllerTest extends CrudControllerTest<FornecedorDTO> {

    @Inject
    CidadeService cidadeService;
    private Cidade cidade;

    @Override
    protected void onBeforeAll() {
        this.cidade = new Cidade();
        this.cidade.setNome("Pato Branco");
        this.cidade.setEstado(UnidadeFederativa.PR);

        cidadeService.save(cidade);
    }

    @Override
    protected void onAfterAll() {
        cidadeService.deleteById(cidade.getId());
    }


    @Override
    protected String getURL() {
        return "/fornecedores";
    }

    @Override
    protected FornecedorDTO createValidObject() {
        // A criação do DTO continua usando o objeto mockado, que agora é recriado para cada teste.
        return new FornecedorDTO(null, "Fornecedor Teste", "Razão Social Teste", "35258347000113",
                "Rua Teste", "123", "Bairro Teste", "teste@gmail.com", "46999998888", this.cidade, UnidadeFederativa.PR);
    }

    @Override
    protected FornecedorDTO createInvalidObject() {
        return new FornecedorDTO(null, "Fornecedor Inválido", "Razão Social Inválida", "352583000113", // CNPJ Inválido
                "Rua Teste", "123", "Bairro Teste", "teste@gmail.com", "46999998888", this.cidade, UnidadeFederativa.PR);
    }

    @Override
    protected void onBeforeUpdate(FornecedorDTO dto) {
        dto.setId(1L);
    }

    @Override
    protected void searchEntries() {
        Assertions.assertThrows(NullPointerException.class, super::searchEntries);
    }

    @Override
    protected RequestPostProcessor auth() {
        return SecurityMockMvcRequestPostProcessors.user("usuario1").roles("USER");
    }
}

