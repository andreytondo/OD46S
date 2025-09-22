package br.edu.utfpr.dainf.dto;

import br.edu.utfpr.dainf.shared.Identifiable;
import lombok.*;

@Builder
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class SolicitationItemDTO implements Identifiable<Long> {
    private Long id;
    private Double quantity;
    private ItemDTO item;
}