package br.edu.utfpr.dainf.inventory.validator;

import br.edu.utfpr.dainf.exception.InvalidTransactionException;
import br.edu.utfpr.dainf.inventory.transaction.Transaction;
import br.edu.utfpr.dainf.model.Inventory;
import br.edu.utfpr.dainf.model.Item;

import java.math.BigDecimal;
import java.util.Optional;

public class MinimumStockValidator implements TransactionValidator {

    @Override
    public void validate(Inventory inventory, BigDecimal quantity, Transaction transaction) {
        Optional<BigDecimal> minimum = Optional.ofNullable(inventory.getItem())
                .map(Item::getMinimumStock);

        if (minimum.isPresent()) {
            BigDecimal minimumStock = minimum.get();
            BigDecimal remaining = inventory.getQuantity().subtract(quantity);
            if (remaining.compareTo(minimumStock) < 0) {
                throw new InvalidTransactionException(
                        String.format("Cannot subtract quantity. " +
                                        "Minimum stock of %f would be breached. " +
                                        "Current stock: %f, attempted subtraction: %f",
                                minimumStock, inventory.getQuantity(), quantity));
            }
        }
    }
}
