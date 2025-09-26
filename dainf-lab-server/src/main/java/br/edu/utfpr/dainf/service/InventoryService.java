package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.enums.InventoryTransactionType;
import br.edu.utfpr.dainf.inventory.TransactionFactory;
import br.edu.utfpr.dainf.inventory.TransactionProcessor;
import br.edu.utfpr.dainf.inventory.auditor.TransactionAuditor;
import br.edu.utfpr.dainf.inventory.transaction.Transaction;
import br.edu.utfpr.dainf.inventory.validator.TransactionValidator;
import br.edu.utfpr.dainf.model.Inventory;
import br.edu.utfpr.dainf.model.Item;
import br.edu.utfpr.dainf.repository.InventoryRepository;
import br.edu.utfpr.dainf.shared.CrudService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class InventoryService extends CrudService<Long, Inventory, InventoryRepository> {

    private final TransactionAuditor auditor;

    public InventoryService(TransactionAuditor auditor) {
        this.auditor = auditor;
    }

    /**
     * Retrieves item quantity
     */
    public BigDecimal getItemQuantity(Item item) {
        return findByItem(item).getQuantity();
    }

    /**
     * Handles transactions in an inventory
     * This is an atomic operation, if anything fails, the operation is canceled
     */
    @Transactional
    public void handleTransaction(Item item, BigDecimal quantity, InventoryTransactionType type) {
        Inventory inventory = findByItem(item);

        TransactionProcessor processor = createProcessor(type);
        processor.process(inventory, quantity, type);

        save(inventory);
    }

    /**
     * Retrieves existing inventory or creates a empty one
     */
    public Inventory findByItem(Item item) {
        return repository.findByItem(item).orElse(new Inventory(item, BigDecimal.ZERO));
    }

    /**
     * Creates decorator class that will handle inventory transactions
     */
    private TransactionProcessor createProcessor(InventoryTransactionType type) {
        Transaction transaction = TransactionFactory.create(type);
        TransactionValidator validator = TransactionFactory.createValidators(type);
        return new TransactionProcessor(transaction, validator, auditor);
    }
}
