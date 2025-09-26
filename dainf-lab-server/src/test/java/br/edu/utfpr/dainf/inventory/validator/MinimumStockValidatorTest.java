package br.edu.utfpr.dainf.inventory.validator;

import br.edu.utfpr.dainf.exception.InvalidTransactionException;
import br.edu.utfpr.dainf.model.Inventory;
import br.edu.utfpr.dainf.model.Item;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

class MinimumStockValidatorTest {

    final MinimumStockValidator validator = new MinimumStockValidator();

    @Test
    void validate() {
        Item item = new Item();
        item.setMinimumStock(BigDecimal.ONE);
        Inventory inventory = new Inventory();
        inventory.setItem(item);
        inventory.setQuantity(BigDecimal.TEN);
        assertThrows(InvalidTransactionException.class, () -> validator.validate(inventory, BigDecimal.TEN, null));
    }

    @Test
    void validateDoesNotThrow() {
        Inventory inventory = new Inventory();
        inventory.setQuantity(BigDecimal.TEN);
        assertDoesNotThrow(() -> validator.validate(inventory, BigDecimal.TEN, null));
    }
}