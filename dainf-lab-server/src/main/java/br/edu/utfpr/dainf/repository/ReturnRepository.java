package br.edu.utfpr.dainf.repository;

import br.edu.utfpr.dainf.model.Return;
import br.edu.utfpr.dainf.shared.CrudRepository;
import br.edu.utfpr.dainf.spec.ReturnSpecExecutor;

public interface ReturnRepository extends CrudRepository<Long, Return>, ReturnSpecExecutor {
    Return findByLoanId(Long loanId);
}
