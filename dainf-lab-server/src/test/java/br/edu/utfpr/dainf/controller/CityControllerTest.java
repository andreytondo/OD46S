package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.CidadeDTO;
import br.edu.utfpr.dainf.enums.UnidadeFederativa;
import br.edu.utfpr.dainf.shared.CrudControllerTest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.TestInstance;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class CityControllerTest extends CrudControllerTest<CidadeDTO> {
    @Override
    protected String getURL() {
        return "/cidades";
    }

    @Override
    protected CidadeDTO createValidObject() {
        return new CidadeDTO(null, "Pato Branco", UnidadeFederativa.DF);
    }

    @Override
    protected CidadeDTO createInvalidObject() {
        return new CidadeDTO();
    }

    @Override
    protected void onBeforeUpdate(CidadeDTO dto) {
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