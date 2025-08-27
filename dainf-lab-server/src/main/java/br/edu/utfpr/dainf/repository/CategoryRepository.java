package br.edu.utfpr.dainf.repository;

import br.edu.utfpr.dainf.model.Category;
import br.edu.utfpr.dainf.shared.CrudRepository;
import br.edu.utfpr.dainf.spec.CategorySpecExecutor;

public interface CategoryRepository extends CrudRepository<Long, Category>, CategorySpecExecutor {
}
