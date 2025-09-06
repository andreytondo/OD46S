package br.edu.utfpr.dainf.repository;

import br.edu.utfpr.dainf.model.Fornecedor;
import br.edu.utfpr.dainf.shared.CrudRepository;

import java.util.List;

public interface FornecedorRepository extends CrudRepository<Long, Fornecedor> {
    List<Fornecedor> findByNomeFantasiaLikeIgnoreCase (String query);
}
