package br.edu.utfpr.dainf.inventory.validator;

import br.edu.utfpr.dainf.exception.InvalidTransactionException;
import br.edu.utfpr.dainf.inventory.transaction.Transaction;
import br.edu.utfpr.dainf.model.Inventory;

import java.math.BigDecimal;

public class PositiveQuantityValidator implements TransactionValidator {
    @Override
    public void validate(Inventory inventory, BigDecimal quantity, Transaction transaction) {
        if (quantity.compareTo(BigDecimal.ZERO) <= 0) {
            throw new InvalidTransactionException("Quantity must be greater than zero.");
        }
    }
}