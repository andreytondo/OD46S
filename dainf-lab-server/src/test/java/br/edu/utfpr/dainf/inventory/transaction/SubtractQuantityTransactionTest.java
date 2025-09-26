package br.edu.utfpr.dainf.inventory.transaction;

import br.edu.utfpr.dainf.model.Inventory;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SubtractQuantityTransactionTest {

    final SubtractQuantityTransaction transaction = new SubtractQuantityTransaction();

    @Test
    void apply() {
        Inventory inventory = new Inventory();
        inventory.setQuantity(BigDecimal.TEN);
        BigDecimal toSubtract = BigDecimal.TWO;
        transaction.apply(inventory, toSubtract, null);
        assertEquals(new BigDecimal("8"), inventory.getQuantity());
    }
}