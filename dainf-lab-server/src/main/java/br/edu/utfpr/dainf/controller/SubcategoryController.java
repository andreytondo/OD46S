package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.SubcategoryDTO;
import br.edu.utfpr.dainf.model.Subcategory;
import br.edu.utfpr.dainf.repository.SubcategoryRepository;
import br.edu.utfpr.dainf.service.SubcategoryService;
import br.edu.utfpr.dainf.shared.CrudController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("subcategories")
public class SubcategoryController extends CrudController<Long, Subcategory, SubcategoryDTO, SubcategoryRepository, SubcategoryService> {
    public SubcategoryController() {super(Subcategory.class, SubcategoryDTO.class);
    }

    @Override
    public SubcategoryDTO toDto(Subcategory entity) {
        entity.setDescription(entity.getDescription());
        entity.setCategory(entity.getCategory());
        return super.toDto(entity);
    }
}
