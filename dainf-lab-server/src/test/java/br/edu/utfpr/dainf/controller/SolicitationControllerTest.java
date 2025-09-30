package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.SolicitationDTO;
import br.edu.utfpr.dainf.shared.CrudControllerTest;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import java.time.Instant;
import java.util.List;

class SolicitationControllerTest extends CrudControllerTest<SolicitationDTO> {

    @Override
    protected String getURL() {
        return "/solicitations";
    }

    @Override
    protected SolicitationDTO createValidObject() {
        return SolicitationDTO.builder()
                .observation("Test Justification")
                .date(Instant.now())
                .items(List.of())
                .build();
    }

    @Override
    protected SolicitationDTO createInvalidObject() {
        return new SolicitationDTO();
    }

    @Override
    protected void onBeforeUpdate(SolicitationDTO dto) {
        dto.setObservation("Updated Test Justification");
    }

    @Override
    protected RequestPostProcessor auth() {
        return SecurityMockMvcRequestPostProcessors.user("usuario1").roles("USER");
    }
}
