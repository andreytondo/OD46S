package br.edu.utfpr.dainf.dto;

import br.edu.utfpr.dainf.shared.Identifiable;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoanItemDTO implements Identifiable<Long> {
    private Long id;

    private ItemDTO item;

    @NotNull(message = "O campo 'Deve retornar?' é obrigatório.")
    private boolean shouldReturn;

    @NotNull(message = "O campo 'Quantidade' é obrigatório.")
    private BigDecimal quantity;

    public LoanItemDTO(Long id) {
        this.id = id;
    }
}
