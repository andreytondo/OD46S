package br.edu.utfpr.dainf.inventory.validator;

import br.edu.utfpr.dainf.exception.InvalidTransactionException;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

class PositiveQuantityValidatorTest {

    final PositiveQuantityValidator validator = new PositiveQuantityValidator();

    @Test
    void validate() {
        assertThrows(InvalidTransactionException.class, () -> validator.validate(null, BigDecimal.ZERO, null));
    }

    @Test
    void validateDoesNotThrow() {
        assertDoesNotThrow(() -> validator.validate(null, BigDecimal.TEN, null));
    }
}