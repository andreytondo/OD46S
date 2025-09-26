package br.edu.utfpr.dainf.inventory.validator;

import br.edu.utfpr.dainf.inventory.transaction.Transaction;
import br.edu.utfpr.dainf.model.Inventory;

import java.math.BigDecimal;
import java.util.List;

public record CompositeValidator(List<TransactionValidator> validators) implements TransactionValidator {
    @Override
    public void validate(Inventory inventory, BigDecimal quantity, Transaction transaction) {
        for (TransactionValidator validator : validators) {
            validator.validate(inventory, quantity, transaction);
        }
    }
}