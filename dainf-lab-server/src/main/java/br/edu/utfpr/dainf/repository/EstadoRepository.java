package br.edu.utfpr.dainf.repository;

import br.edu.utfpr.dainf.model.Estado;
import br.edu.utfpr.dainf.model.Fornecedor;
import br.edu.utfpr.dainf.shared.CrudRepository;

import java.util.List;

public interface EstadoRepository extends CrudRepository<Long, Estado> {
    List<Estado> findByNomeLikeIgnoreCase(String query);
}
