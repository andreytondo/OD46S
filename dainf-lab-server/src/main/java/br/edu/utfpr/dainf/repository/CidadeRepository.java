package br.edu.utfpr.dainf.repository;

import br.edu.utfpr.dainf.model.Cidade;
import br.edu.utfpr.dainf.model.Estado;
import br.edu.utfpr.dainf.model.Fornecedor;
import br.edu.utfpr.dainf.shared.CrudRepository;

import java.util.List;

public interface CidadeRepository extends CrudRepository<Long, Cidade> {
    List<Cidade> findByNomeLikeIgnoreCase(String query);
    List<Cidade> findAllByEstado(Estado estado);
    List<Cidade> findByNomeLikeIgnoreCaseAndEstado(String query, Estado estado);
}
