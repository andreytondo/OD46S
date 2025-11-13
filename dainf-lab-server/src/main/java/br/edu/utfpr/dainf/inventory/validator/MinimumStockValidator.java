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
                String itemName = Optional.of(inventory.getItem())
                        .map(Item::getName)
                        .orElse("");

                throw new InvalidTransactionException(String.format(
                        "Não é possível remover %.2f unidades do item '%s'. " +
                                "O estoque mínimo é %.2f e seria ultrapassado. " +
                                "Estoque atual: %.2f.",
                        quantity, itemName, minimumStock, inventory.getQuantity()
                ));
            }
        }
    }
}
