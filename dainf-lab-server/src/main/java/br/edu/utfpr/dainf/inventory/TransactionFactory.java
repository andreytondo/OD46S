package br.edu.utfpr.dainf.inventory;

import br.edu.utfpr.dainf.enums.InventoryTransactionType;
import br.edu.utfpr.dainf.inventory.transaction.SubtractQuantityTransaction;
import br.edu.utfpr.dainf.inventory.transaction.SumQuantityTransaction;
import br.edu.utfpr.dainf.inventory.transaction.Transaction;
import br.edu.utfpr.dainf.inventory.validator.*;

import java.util.List;

public class TransactionFactory {

    public static Transaction create(InventoryTransactionType type) {
        return switch (type) {
            case PURCHASE, RETURN -> new SumQuantityTransaction();
            case ISSUE, LOAN -> new SubtractQuantityTransaction();
        };
    }

    public static TransactionValidator createValidators(InventoryTransactionType type) {
        return switch (type) {
            case PURCHASE, RETURN -> new CompositeValidator(List.of(new PositiveQuantityValidator()));
            case ISSUE, LOAN -> new CompositeValidator(List.of(
                    new PositiveQuantityValidator(),
                    new PositiveInventoryValidator(),
                    new MinimumStockValidator()
            ));
        };
    }
}
