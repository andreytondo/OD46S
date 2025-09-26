package br.edu.utfpr.dainf.inventory.transaction;

import br.edu.utfpr.dainf.enums.InventoryTransactionType;
import br.edu.utfpr.dainf.model.Inventory;

import java.math.BigDecimal;

public class SubtractQuantityTransaction implements Transaction {
    @Override
    public void apply(Inventory inventory, BigDecimal quantity, InventoryTransactionType type) {
        inventory.setQuantity(inventory.getQuantity().subtract(quantity));
    }
}