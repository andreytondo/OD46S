package br.edu.utfpr.dainf.dto;

import br.edu.utfpr.dainf.shared.Identifiable;
import lombok.*;

import java.math.BigDecimal;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReturnItemDTO implements Identifiable<Long> {
    private Long id;
    private ItemDTO item;
    private BigDecimal quantityReturned;
    private BigDecimal quantityIssued;
}
