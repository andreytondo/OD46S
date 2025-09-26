package br.edu.utfpr.dainf.inventory.auditor;

import br.edu.utfpr.dainf.enums.InventoryTransactionType;
import br.edu.utfpr.dainf.inventory.transaction.Transaction;
import br.edu.utfpr.dainf.model.Inventory;
import br.edu.utfpr.dainf.model.InventoryTransaction;
import br.edu.utfpr.dainf.service.InventoryTransactionService;
import br.edu.utfpr.dainf.service.UserService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;

@Service
public class DefaultTransactionAuditor implements TransactionAuditor {

    private final InventoryTransactionService service;
    private final UserService userService;

    public DefaultTransactionAuditor(InventoryTransactionService service, UserService userService) {
        this.service = service;
        this.userService = userService;
    }

    @Override
    public void audit(Inventory inventory, BigDecimal quantity, Transaction transaction, InventoryTransactionType type) {
        InventoryTransaction model = new InventoryTransaction();
        model.setDate(Instant.now());
        model.setInventory(inventory);
        model.setQuantity(quantity);
        model.setUser(userService.getCurrentUser());
        model.setType(type);
        service.save(model);
    }
}
