package br.edu.utfpr.dainf.dto;

import br.edu.utfpr.dainf.shared.Identifiable;
import lombok.*;

import java.math.BigDecimal;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseItemDTO implements Identifiable<Long> {
    private Long id;
    private BigDecimal quantity;
    private BigDecimal price;
    private ItemDTO item;
}
