package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.model.Loan;
import br.edu.utfpr.dainf.repository.LoanRepository;
import br.edu.utfpr.dainf.shared.CrudService;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Service;

@Service
public class LoanService extends CrudService<Long, Loan, LoanRepository> {
    @Override
    public JpaSpecificationExecutor<Loan> getSpecExecutor() {
        return repository;
    }

    @Override
    public Loan save(Loan entity) {
        if (entity.getItems() != null) {
            entity.getItems().forEach(item -> item.setLoan(entity));
        }
        return super.save(entity);
    }
}
