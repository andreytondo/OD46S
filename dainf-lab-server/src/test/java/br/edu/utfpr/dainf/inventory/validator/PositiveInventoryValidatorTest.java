package br.edu.utfpr.dainf.inventory.validator;

import br.edu.utfpr.dainf.exception.InvalidTransactionException;
import br.edu.utfpr.dainf.model.Inventory;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

class PositiveInventoryValidatorTest {

    final PositiveInventoryValidator validator = new PositiveInventoryValidator();

    @Test
    void validate() {
        Inventory inventory = new Inventory();
        inventory.setQuantity(BigDecimal.ONE);
        assertThrows(InvalidTransactionException.class, () -> validator.validate(inventory, BigDecimal.TEN, null));
    }

    @Test
    void validateDoesNotThrow() {
        Inventory inventory = new Inventory();
        inventory.setQuantity(BigDecimal.TEN);
        assertDoesNotThrow(() -> validator.validate(inventory, BigDecimal.ONE, null));
    }
}