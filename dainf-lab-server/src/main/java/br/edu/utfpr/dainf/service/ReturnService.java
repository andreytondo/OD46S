package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.enums.InventoryTransactionType;
import br.edu.utfpr.dainf.model.*;
import br.edu.utfpr.dainf.repository.IssueRepository;
import br.edu.utfpr.dainf.repository.ReturnRepository;
import br.edu.utfpr.dainf.shared.CrudService;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ReturnService extends CrudService<Long, Return, ReturnRepository> {

    private final InventoryService inventoryService;
    private final IssueRepository issueRepository;
    private final IssueService issueService;
    private final UserService userService;

    public ReturnService(InventoryService inventoryService, IssueRepository issueRepository, IssueService issueService, UserService userService) {
        this.inventoryService = inventoryService;
        this.issueRepository = issueRepository;
        this.issueService = issueService;
        this.userService = userService;
    }

    @Override
    public JpaSpecificationExecutor<Return> getSpecExecutor() {
        return repository;
    }

    @Override
    public Return save(Return entity) {
        // Fetch old entity if updating (to revert previous inventory operations)
        Return existing = entity.getId() != null ? repository.findById(entity.getId()).orElse(null) : null;

        if (entity.getItems() != null) {
            for (ReturnItem item : entity.getItems()) {
                item.setAReturn(entity);

                // --- Handle RETURN quantity updates ---
                ReturnItem oldItem = findOldItem(existing, item);
                inventoryService.updateTransaction(
                        item.getItem(),
                        oldItem != null ? oldItem.getQuantityReturned() : BigDecimal.ZERO,
                        InventoryTransactionType.RETURN,
                        item.getQuantityReturned()
                );
            }
            createIssue(entity);
        }

        return super.save(entity);
    }

    private ReturnItem findOldItem(Return existing, ReturnItem current) {
        if (existing == null || existing.getItems() == null) return null;
        return existing.getItems().stream()
                .filter(i -> Objects.equals(i.getItem().getId(), current.getItem().getId()))
                .findFirst()
                .orElse(null);
    }

    public Return findByLoanId(Long loanId) {
        return repository.findByLoanId(loanId);
    }

    private void createIssue(Return entity) {
        Issue issue = findIssue(entity);
        issue.setLoan(entity.getLoan());
        issue.setDate(Instant.now());
        issue.setUser(userService.getCurrentUser());
        issue.setObservation("Registo criado a partir do empréstimo ID: " + entity.getLoan().getId());

        List<IssueItem> items = issue.getItems();
        if (items == null) {
            items = new ArrayList<>();
            issue.setItems(items);
        } else {
            items.clear();
        }

        for (ReturnItem item : entity.getItems()) {
            IssueItem issueItem = new IssueItem();
            issueItem.setItem(item.getItem());
            issueItem.setQuantity(item.getQuantityIssued());
            items.add(issueItem);
        }

        issue.setItems(items);
        issueService.save(issue, false);
    }

    private Issue findIssue(Return entity) {
        return Optional.ofNullable(entity.getLoan())
                .flatMap(issueRepository::findByLoan)
                .orElse(new Issue());
    }
}
