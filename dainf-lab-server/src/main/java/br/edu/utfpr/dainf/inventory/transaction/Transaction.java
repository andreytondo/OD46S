package br.edu.utfpr.dainf.inventory.transaction;

import br.edu.utfpr.dainf.enums.InventoryTransactionType;
import br.edu.utfpr.dainf.model.Inventory;

import java.math.BigDecimal;

public interface Transaction {
    void apply(Inventory inventory, BigDecimal quantity, InventoryTransactionType type);
}
