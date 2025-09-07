package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.model.Subcategory;
import br.edu.utfpr.dainf.repository.SubcategoryRepository;
import br.edu.utfpr.dainf.shared.CrudService;
import org.springframework.stereotype.Service;

@Service
public class SubcategoryService extends CrudService<Long, Subcategory, SubcategoryRepository> {
}
