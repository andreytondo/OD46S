package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.enums.InventoryTransactionType;
import br.edu.utfpr.dainf.model.Loan;
import br.edu.utfpr.dainf.model.LoanItem;
import br.edu.utfpr.dainf.repository.LoanRepository;
import br.edu.utfpr.dainf.shared.CrudService;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Service;

@Service
public class LoanService extends CrudService<Long, Loan, LoanRepository> {

    private final InventoryService inventoryService;

    public LoanService(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @Override
    public JpaSpecificationExecutor<Loan> getSpecExecutor() {
        return repository;
    }

    @Override
    public Loan save(Loan entity) {
        if (entity.getItems() != null) {
            for (LoanItem item : entity.getItems()) {
                item.setLoan(entity);
                inventoryService.handleTransaction(item.getItem(), item.getQuantity(), InventoryTransactionType.LOAN);
            }
        }
        return super.save(entity);
    }
}
