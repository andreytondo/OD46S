package br.edu.utfpr.dainf.dto;

import br.edu.utfpr.dainf.shared.Identifiable;
import lombok.*;

import java.time.Instant;
import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseDTO implements Identifiable<Long> {
    private Long id;
    private Instant date;
    private String observation;
    private FornecedorDTO fornecedor;
    private SimpleUserDTO user;
    private List<PurchaseItemDTO> items;
}
