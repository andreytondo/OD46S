package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.enums.InventoryTransactionType;
import br.edu.utfpr.dainf.enums.LoanStatus;
import br.edu.utfpr.dainf.model.Loan;
import br.edu.utfpr.dainf.model.LoanItem;
import br.edu.utfpr.dainf.repository.LoanRepository;
import br.edu.utfpr.dainf.repository.ReturnRepository;
import br.edu.utfpr.dainf.shared.CrudService;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Service
public class LoanService extends CrudService<Long, Loan, LoanRepository> {

    private final InventoryService inventoryService;
    private final ReturnRepository returnRepository;

    public LoanService(InventoryService inventoryService, ReturnRepository returnRepository) {
        this.inventoryService = inventoryService;
        this.returnRepository = returnRepository;
    }

    @Override
    public JpaSpecificationExecutor<Loan> getSpecExecutor() {
        return repository;
    }

    @Override
    public Loan save(Loan entity) {
        if (entity.getLoanDate() == null) {
            entity.setLoanDate(Instant.now());
        }
        if (entity.getId() != null && entity.getStatus() == null) {
            repository.findById(entity.getId()).ifPresent(dbLoan -> entity.setStatus(dbLoan.getStatus()));
        }
        if (entity.getStatus() == null) {
            entity.setStatus(LoanStatus.ONGOING);
        }

        if (entity.getItems() != null) {
            for (LoanItem item : entity.getItems()) {
                item.setLoan(entity);
                inventoryService.handleTransaction(item.getItem(), item.getQuantity(), InventoryTransactionType.LOAN);
            }
        }

        Loan saved = super.save(entity);
        return refreshStatus(saved);
    }

    public List<LoanItem> getActiveLoansForItem(Long itemId) {
        return repository.findActiveByItem(itemId);
    }

    public List<LoanItem> getHistoryForItem(Long itemId) {
        return repository.findHistoryByItem(itemId);
    }

    public Loan refreshStatus(Loan loan) {
        if (loan == null || loan.getId() == null) {
            return loan;
        }

        LoanStatus newStatus = resolveStatus(loan);
        if (newStatus != loan.getStatus()) {
            loan.setStatus(newStatus);
            return repository.save(loan);
        }
        return loan;
    }

    private LoanStatus resolveStatus(Loan loan) {
        BigDecimal expectedReturn = defaultZero(repository.sumReturnableQuantity(loan.getId()));

        // Nothing to return → auto-completed
        if (expectedReturn.compareTo(BigDecimal.ZERO) == 0) {
            return LoanStatus.COMPLETED;
        }

        BigDecimal returned = defaultZero(returnRepository.sumQuantityReturnedByLoan(loan.getId()));
        BigDecimal issued = defaultZero(returnRepository.sumQuantityIssuedByLoan(loan.getId()));
        BigDecimal settled = returned.add(issued);

        if (settled.compareTo(expectedReturn) >= 0) {
            return LoanStatus.COMPLETED;
        }

        Instant deadline = loan.getDeadline();
        if (deadline != null && Instant.now().isAfter(deadline)) {
            return LoanStatus.OVERDUE;
        }
        return LoanStatus.ONGOING;
    }

    private BigDecimal defaultZero(BigDecimal value) {
        return value != null ? value : BigDecimal.ZERO;
    }
}
