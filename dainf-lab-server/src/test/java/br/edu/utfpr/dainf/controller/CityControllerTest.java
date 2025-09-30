package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.CidadeDTO;
import br.edu.utfpr.dainf.enums.UnidadeFederativa;
import br.edu.utfpr.dainf.shared.CrudControllerTest;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

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
        dto.setNome("Pato Branco Alterado");
    }

    @Override
    protected RequestPostProcessor auth() {
        return SecurityMockMvcRequestPostProcessors.user("usuario1").roles("USER");
    }
}
