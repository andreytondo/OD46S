package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.CategoryDTO;
import br.edu.utfpr.dainf.model.Category;
import br.edu.utfpr.dainf.repository.CategoryRepository;
import br.edu.utfpr.dainf.service.CategoryService;
import br.edu.utfpr.dainf.shared.CrudController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("categories")
public class CategoryController extends CrudController<Long, Category, CategoryDTO, CategoryRepository, CategoryService> {

    public CategoryController() {
        super(Category.class, CategoryDTO.class);
    }

    @Override
    public CategoryDTO toDto(Category entity) {
        entity.setDescription(entity.getDescription());
        entity.setSubcategories(entity.getSubcategories());
        return super.toDto(entity);
    }
}