package br.edu.utfpr.dainf.inventory.validator;

import br.edu.utfpr.dainf.inventory.transaction.Transaction;
import br.edu.utfpr.dainf.model.Inventory;

import java.math.BigDecimal;

public interface TransactionValidator {
    void validate(Inventory inventory, BigDecimal quantity, Transaction transaction);
}
