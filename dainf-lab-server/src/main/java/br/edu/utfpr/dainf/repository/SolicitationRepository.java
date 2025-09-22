package br.edu.utfpr.dainf.repository;

import br.edu.utfpr.dainf.model.Solicitation;
import br.edu.utfpr.dainf.model.User;
import br.edu.utfpr.dainf.shared.CrudRepository;
import br.edu.utfpr.dainf.spec.SolicitationSpecExecutor;

import java.util.List;

public interface SolicitationRepository extends CrudRepository<Long, Solicitation>, SolicitationSpecExecutor {
}
