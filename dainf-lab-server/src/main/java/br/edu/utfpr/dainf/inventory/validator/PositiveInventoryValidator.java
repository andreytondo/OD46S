package br.edu.utfpr.dainf.inventory.validator;

import br.edu.utfpr.dainf.exception.InvalidTransactionException;
import br.edu.utfpr.dainf.inventory.transaction.Transaction;
import br.edu.utfpr.dainf.model.Inventory;

import java.math.BigDecimal;

public class PositiveInventoryValidator implements TransactionValidator {

    @Override
    public void validate(Inventory inventory, BigDecimal quantity, Transaction transaction) {
        BigDecimal remaining = inventory.getQuantity().subtract(quantity);

        if (remaining.compareTo(BigDecimal.ZERO) < 0) {
            throw new InvalidTransactionException(
                    String.format(
                            "Cannot subtract quantity. Current stock of %s would be breached. Attempted subtraction: %s",
                            inventory.getQuantity(), quantity
                    )
            );
        }
    }
}
