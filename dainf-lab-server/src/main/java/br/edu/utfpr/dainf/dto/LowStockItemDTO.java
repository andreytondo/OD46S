package br.edu.utfpr.dainf.dto;

import java.math.BigDecimal;

public record LowStockItemDTO(
        Long itemId,
        String name,
        BigDecimal quantity,
        BigDecimal minimumStock,
        String category
) {
}
