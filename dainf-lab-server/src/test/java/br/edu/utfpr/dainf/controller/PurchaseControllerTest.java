package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.PurchaseDTO;
import br.edu.utfpr.dainf.shared.CrudControllerTest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.TestInstance;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class PurchaseControllerTest extends CrudControllerTest<PurchaseDTO> {

    @Override
    protected String getURL() {
        return "/purchases";
    }

    @Override
    protected PurchaseDTO createValidObject() {
        return PurchaseDTO.builder()
                .build();
    }

    @Override
    protected PurchaseDTO createInvalidObject() {
        return new PurchaseDTO();
    }

    @Override
    protected void onBeforeUpdate(PurchaseDTO dto) {
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