package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.FornecedorDTO;
import br.edu.utfpr.dainf.enums.UnidadeFederativa;
import br.edu.utfpr.dainf.model.Cidade;
import br.edu.utfpr.dainf.repository.CidadeRepository;
import br.edu.utfpr.dainf.shared.CrudControllerTest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import java.util.Optional;

class SupplierControllerTest extends CrudControllerTest<FornecedorDTO> {

    @MockBean
    private CidadeRepository cidadeRepository;

    private Cidade cidadeMock;

    // Alterado de @BeforeAll para @BeforeEach.
    // Este método agora será executado antes de cada teste, garantindo um ambiente limpo e isolado.
    @BeforeEach
    void setupMocks() {
        this.cidadeMock = new Cidade();
        this.cidadeMock.setId(1L);
        this.cidadeMock.setNome("Pato Branco");
        this.cidadeMock.setEstado(UnidadeFederativa.PR);

        Mockito.when(cidadeRepository.findById(1L))
                .thenReturn(Optional.of(this.cidadeMock));
    }


    @Override
    protected String getURL() {
        return "/fornecedores";
    }

    @Override
    protected FornecedorDTO createValidObject() {
        // A criação do DTO continua usando o objeto mockado, que agora é recriado para cada teste.
        return new FornecedorDTO(null, "Fornecedor Teste", "Razão Social Teste", "35258347000113",
                "Rua Teste", "123", "Bairro Teste", "teste@gmail.com", "46999998888", this.cidadeMock, UnidadeFederativa.PR);
    }

    @Override
    protected FornecedorDTO createInvalidObject() {
        return new FornecedorDTO(null, "Fornecedor Inválido", "Razão Social Inválida", "352583000113", // CNPJ Inválido
                "Rua Teste", "123", "Bairro Teste", "teste@gmail.com", "46999998888", this.cidadeMock, UnidadeFederativa.PR);
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

