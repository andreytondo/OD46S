package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.FornecedorDTO;
import br.edu.utfpr.dainf.dto.PurchaseDTO;
import br.edu.utfpr.dainf.enums.UnidadeFederativa;
import br.edu.utfpr.dainf.model.Cidade;
import br.edu.utfpr.dainf.model.Fornecedor;
import br.edu.utfpr.dainf.service.CidadeService;
import br.edu.utfpr.dainf.service.FornecedorService;
import br.edu.utfpr.dainf.shared.CrudControllerTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import java.time.Instant;
import java.util.List;

class PurchaseControllerTest extends CrudControllerTest<PurchaseDTO> {

    private FornecedorDTO fornecedor;

    @Inject
    FornecedorController fornecedorController;

    @Inject
    CidadeService cidadeService;

    @BeforeEach
    protected void setUp() {
        Cidade cidade = new Cidade();
        cidade.setNome("Pato Branco");
        cidade.setEstado(UnidadeFederativa.PR);
        cidadeService.save(cidade);

        this.fornecedor = new FornecedorDTO(null, "Fornecedor Teste", "Razão Social Teste", "35258347000113",
            "Rua Teste", "123", "Bairro Teste", "teste@gmail.com", "46999998888", cidade, UnidadeFederativa.PR);
        ResponseEntity<Long> id = fornecedorController.create(fornecedor);
        fornecedor.setId(id.getBody());
    }

    @Override
    protected String getURL() {
        return "/purchases";
    }

    @Override
    protected PurchaseDTO createValidObject() {
        return PurchaseDTO.builder()
                .date(Instant.now())
                .items(List.of())
                .fornecedor(fornecedor)
                .build();
    }

    @Override
    protected PurchaseDTO createInvalidObject() {
        return new PurchaseDTO();
    }

    @Override
    protected void onBeforeUpdate(PurchaseDTO dto) {
        dto.setDate(Instant.now());
    }
}
