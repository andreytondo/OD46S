package br.edu.utfpr.dainf.inventory.validator;

import br.edu.utfpr.dainf.exception.InvalidTransactionException;
import br.edu.utfpr.dainf.inventory.transaction.Transaction;
import br.edu.utfpr.dainf.model.Inventory;
import br.edu.utfpr.dainf.model.Item;

import java.math.BigDecimal;
import java.util.Optional;

public class PositiveInventoryValidator implements TransactionValidator {

    @Override
    public void validate(Inventory inventory, BigDecimal quantity, Transaction transaction) {
        BigDecimal remaining = inventory.getQuantity().subtract(quantity);

        if (remaining.compareTo(BigDecimal.ZERO) < 0) {
            String itemName = Optional.ofNullable(inventory.getItem())
                    .map(Item::getName)
                    .orElse("");

            throw new InvalidTransactionException(String.format(
                    "Não é possível remover %.2f unidades do item '%s'. " +
                            "O estoque atual é %.2f e ficaria negativo.",
                    quantity, itemName, inventory.getQuantity()
            ));
        }
    }
}
