package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.CategoryDTO;
import br.edu.utfpr.dainf.shared.CrudControllerTest;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import java.util.List;

class CategoryControllerTest extends CrudControllerTest<CategoryDTO> {

    @Override
    protected String getURL() {
        return "/categories";
    }

    @Override
    protected CategoryDTO createValidObject() {
        CategoryDTO child1 = createChild("child1");
        CategoryDTO child2 = createChild("child2");
        return new CategoryDTO(null, "Teste", "icon", List.of(child1, child2));
    }

    @Override
    protected CategoryDTO createInvalidObject() {
        return new CategoryDTO(null, null, "icon", List.of());
    }

    @Override
    protected void onBeforeUpdate(CategoryDTO dto) {
        dto.setDescription("Teste Alterado");
    }

    private CategoryDTO createChild(String description) {
        CategoryDTO child = new CategoryDTO();
        child.setDescription(description);
        child.setIcon("icon");
        return child;
    }
}
