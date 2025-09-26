package br.edu.utfpr.dainf.inventory;

import br.edu.utfpr.dainf.enums.InventoryTransactionType;
import br.edu.utfpr.dainf.inventory.auditor.TransactionAuditor;
import br.edu.utfpr.dainf.inventory.transaction.Transaction;
import br.edu.utfpr.dainf.inventory.validator.TransactionValidator;
import br.edu.utfpr.dainf.model.Inventory;

import java.math.BigDecimal;

public record TransactionProcessor(Transaction transaction,
                                   TransactionValidator validator,
                                   TransactionAuditor auditor) {

    public void process(Inventory inventory, BigDecimal quantity, InventoryTransactionType type) {
        validator.validate(inventory, quantity, transaction);
        transaction.apply(inventory, quantity, type);
        auditor.audit(inventory, quantity, transaction, type);
    }
}