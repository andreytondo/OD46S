package br.edu.utfpr.dainf.repository;

import br.edu.utfpr.dainf.model.Fornecedor;
import br.edu.utfpr.dainf.shared.CrudRepository;
import br.edu.utfpr.dainf.spec.FornecedorSpecExecutor;

import java.util.List;

public interface FornecedorRepository extends CrudRepository<Long, Fornecedor>, FornecedorSpecExecutor {
}
