package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.enums.InventoryTransactionType;
import br.edu.utfpr.dainf.model.Issue;
import br.edu.utfpr.dainf.model.IssueItem;
import br.edu.utfpr.dainf.repository.IssueRepository;
import br.edu.utfpr.dainf.shared.CrudService;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Service;

@Service
public class IssueService extends CrudService<Long, Issue, IssueRepository> {

    private final InventoryService inventoryService;
    private final UserService userService;

    public IssueService(InventoryService inventoryService, UserService userService) {
        this.inventoryService = inventoryService;
        this.userService = userService;
    }

    @Override
    public JpaSpecificationExecutor<Issue> getSpecExecutor() {
        return repository;
    }

    @Override
    public Issue save(Issue entity) {
        return save(entity, true);
    }

    public Issue save(Issue entity, boolean handleTransaction) {
        if (entity.getId() == null) {
            entity.setUser(userService.getCurrentUser());
        }
        if (entity.getItems() != null) {
            for (IssueItem item : entity.getItems()) {
                item.setIssue(entity);
                if (handleTransaction) {
                    inventoryService.handleTransaction(item.getItem(), item.getQuantity(), InventoryTransactionType.ISSUE);
                }
            }
        }
        return super.save(entity);
    }
}
