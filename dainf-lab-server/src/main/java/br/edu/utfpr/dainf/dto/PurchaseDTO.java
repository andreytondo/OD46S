package br.edu.utfpr.dainf.dto;

import br.edu.utfpr.dainf.shared.Identifiable;
import lombok.*;

import java.time.Instant;
import java.util.List;

@Builder
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseDTO implements Identifiable<Long> {
    private Long id;
    private Instant date;
    private FornecedorDTO fornecedor;
    private UserDTO user;
    private List<PurchaseItemDTO> items;
}
