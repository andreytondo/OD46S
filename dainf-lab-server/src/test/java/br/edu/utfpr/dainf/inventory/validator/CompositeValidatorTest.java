package br.edu.utfpr.dainf.inventory.validator;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

class CompositeValidatorTest {

    final CompositeValidator validator = new CompositeValidator(
            List.of()
    );

    @Test
    void validate() {
        assertDoesNotThrow(() -> validator.validate(null, null, null));
    }

}