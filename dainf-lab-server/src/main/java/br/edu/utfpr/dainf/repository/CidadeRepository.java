package br.edu.utfpr.dainf.repository;

import br.edu.utfpr.dainf.model.Cidade;
import br.edu.utfpr.dainf.shared.CrudRepository;
import br.edu.utfpr.dainf.spec.CidadeSpecExecutor;

public interface CidadeRepository extends CrudRepository<Long, Cidade>, CidadeSpecExecutor {
}
