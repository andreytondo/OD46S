package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.CategoryDTO;
import br.edu.utfpr.dainf.dto.CidadeDTO;
import br.edu.utfpr.dainf.dto.SubcategoryDTO;
import br.edu.utfpr.dainf.enums.UnidadeFederativa;
import br.edu.utfpr.dainf.model.Subcategory;
import br.edu.utfpr.dainf.shared.CrudControllerTest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.TestInstance;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import java.util.List;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class CategoryControllerTest extends CrudControllerTest<CategoryDTO> {
    @Override
    protected String getURL() {
        return "/categories";
    }

    @Override
    protected CategoryDTO createValidObject() {
        return new CategoryDTO(null, "Teste", List.of());
    }

    @Override
    protected CategoryDTO createInvalidObject() {
        return new CategoryDTO(null, "Pato Branco", List.of());
    }

    @Override
    protected void onBeforeUpdate(CategoryDTO dto) {
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