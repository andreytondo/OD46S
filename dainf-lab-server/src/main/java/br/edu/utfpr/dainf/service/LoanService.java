package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.enums.InventoryTransactionType;
import br.edu.utfpr.dainf.enums.UserRole;
import br.edu.utfpr.dainf.model.Loan;
import br.edu.utfpr.dainf.model.LoanItem;
import br.edu.utfpr.dainf.model.Solicitation;
import br.edu.utfpr.dainf.model.User;
import br.edu.utfpr.dainf.repository.LoanRepository;
import br.edu.utfpr.dainf.search.request.SearchRequest;
import br.edu.utfpr.dainf.search.request.filter.SearchFilter;
import br.edu.utfpr.dainf.shared.CrudService;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class LoanService extends CrudService<Long, Loan, LoanRepository> {

    private final InventoryService inventoryService;
    private final UserService userService;

    public LoanService(InventoryService inventoryService, UserService userService) {
        this.inventoryService = inventoryService;
        this.userService = userService;
    }

    @Override
    public JpaSpecificationExecutor<Loan> getSpecExecutor() {
        return repository;
    }

    @Override
    public Page<Loan> search(SearchRequest request) {
        User currentUser = userService.getCurrentUser();

        boolean isRestricted = !currentUser.getRole().name().equals(UserRole.ADMIN) &&
                !currentUser.getRole().name().equals(UserRole.LAB_TECHNICIAN);

        if (isRestricted) {
            if (request.getFilters() == null) request.setFilters(new ArrayList());
            request.getFilters().add(
                    new SearchFilter("borrower.id", currentUser.getId(), SearchFilter.Type.EQUALS)
            );
        }

        return super.search(request);
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

    @Override
    public void deleteById(Long id) {
        var optEntity = findById(id);
        if (optEntity.isPresent()) {
            validateAccess(optEntity.get());
            super.deleteById(optEntity.get().getId());
        }
    }

    private void validateAccess(Loan entity) {
        if (entity.getId() == null) return;

        var dbEntity = repository.findById(entity.getId()).orElse(null);
        if (dbEntity == null) return;

        if (!Objects.equals(dbEntity.getBorrower().getId(), userService.getCurrentUser().getId()) && !userService.hasPrivilegedAcess()) {
            throw new AccessDeniedException("Você não tem acesso para este registro");
        }
    }

    public List<LoanItem> getActiveLoansForItem(Long itemId) {
        return repository.findActiveByItem(itemId);
    }

    public List<LoanItem> getHistoryForItem(Long itemId) {
        return repository.findHistoryByItem(itemId);
    }
}
