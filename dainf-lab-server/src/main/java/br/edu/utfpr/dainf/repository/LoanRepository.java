package br.edu.utfpr.dainf.repository;

import br.edu.utfpr.dainf.model.Loan;
import br.edu.utfpr.dainf.shared.CrudRepository;
import br.edu.utfpr.dainf.spec.LoanSpecExecutor;

public interface LoanRepository extends CrudRepository<Long, Loan>, LoanSpecExecutor {
}
