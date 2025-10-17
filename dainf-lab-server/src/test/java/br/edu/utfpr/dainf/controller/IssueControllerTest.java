package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.IssueDTO;
import br.edu.utfpr.dainf.shared.CrudControllerTest;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import java.time.Instant;
import java.util.List;

class IssueControllerTest extends CrudControllerTest<IssueDTO> {
    @BeforeEach
    protected void setUp() {
    }

    @Override
    protected String getURL() {
        return "/issues";
    }

    @Override
    protected IssueDTO createValidObject() {
        return IssueDTO.builder()
                .date(Instant.now())
                .observation("Teste")
                .items(List.of())
                .build();
    }

    @Override
    protected IssueDTO createInvalidObject() {
        return new IssueDTO();
    }

    @Override
    protected void onBeforeUpdate(IssueDTO dto) {
        dto.setObservation("Teste update");
    }
}
