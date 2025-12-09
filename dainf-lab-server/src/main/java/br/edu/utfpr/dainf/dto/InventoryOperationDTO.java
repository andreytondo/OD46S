package br.edu.utfpr.dainf.dto;

import br.edu.utfpr.dainf.enums.InventoryTransactionType;

import java.math.BigDecimal;
import java.time.Instant;

public record InventoryOperationDTO(
        Long id,
        String itemName,
        InventoryTransactionType type,
        BigDecimal quantity,
        Instant date,
        String userName
) { }
