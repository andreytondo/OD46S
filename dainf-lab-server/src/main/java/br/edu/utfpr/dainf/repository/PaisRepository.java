package br.edu.utfpr.dainf.repository;

import br.edu.utfpr.dainf.model.Pais;
import br.edu.utfpr.dainf.shared.CrudRepository;

import java.util.List;

public interface PaisRepository extends CrudRepository<Long, Pais> {
    List<Pais> findByNomeLikeIgnoreCase (String query);
}
