package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.AssetDTO;
import br.edu.utfpr.dainf.dto.ItemDTO;
import br.edu.utfpr.dainf.dto.SolicitationDTO;
import br.edu.utfpr.dainf.shared.CrudControllerTest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.TestInstance;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import java.math.BigDecimal;
import java.util.List;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class SolicitationControllerTest extends CrudControllerTest<SolicitationDTO> {

    @Override
    protected String getURL() {
        return "/solicitations";
    }

    @Override
    protected SolicitationDTO createValidObject() {
        return SolicitationDTO.builder().build();
    }

    @Override
    protected SolicitationDTO createInvalidObject() {
        return new SolicitationDTO();
    }

    @Override
    protected void onBeforeUpdate(SolicitationDTO dto) {
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