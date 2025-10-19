package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.enums.InventoryTransactionType;
import br.edu.utfpr.dainf.enums.LoanStatus;
import br.edu.utfpr.dainf.model.Loan;
import br.edu.utfpr.dainf.model.LoanItem;
import br.edu.utfpr.dainf.repository.LoanRepository;
import br.edu.utfpr.dainf.shared.CrudService;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

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

    public List<LoanItem> getActiveLoansForItem(Long itemId) {
        return repository.findActiveByItem(itemId, Set.of(LoanStatus.ATRASADO, LoanStatus.PENDENTE));
    }

    public List<LoanItem> getHistoryForItem(Long itemId) {
        return repository.findHistoryByItem(itemId);
    }
}
