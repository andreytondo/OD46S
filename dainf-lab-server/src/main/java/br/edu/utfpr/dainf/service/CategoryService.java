package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.model.Category;
import br.edu.utfpr.dainf.repository.CategoryRepository;
import br.edu.utfpr.dainf.shared.CrudService;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Service;

@Service
public class CategoryService extends CrudService<Long, Category, CategoryRepository> {

    @Override
    public JpaSpecificationExecutor<Category> getSpecExecutor() {
        return repository;
    }
}
