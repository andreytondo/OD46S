package br.edu.utfpr.dainf.repository;

import br.edu.utfpr.dainf.model.Subcategory;
import br.edu.utfpr.dainf.shared.CrudRepository;
import br.edu.utfpr.dainf.spec.SubcategorySpecExecutor;

public interface SubcategoryRepository extends CrudRepository<Long, Subcategory>, SubcategorySpecExecutor {
}
