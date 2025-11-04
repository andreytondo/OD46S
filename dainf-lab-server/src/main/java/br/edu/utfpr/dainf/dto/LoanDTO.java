package br.edu.utfpr.dainf.dto;

import br.edu.utfpr.dainf.model.LoanItem;
import br.edu.utfpr.dainf.model.User;
import br.edu.utfpr.dainf.shared.Identifiable;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoanDTO implements Identifiable<Long> {
    private Long id;

    @NotNull(message = "O campo 'Mutuário' é obrigatório.")
    private SimpleUserDTO borrower;

    @NotNull(message = "O campo 'Data de empréstimo' é obrigatório.")
    private Instant loanDate;

    @NotNull(message = "O campo 'Prazo' é obrigatório.")
    private Instant deadline;

    private String observation;

    @NotEmpty
    @NotNull(message = "O campo 'Itens' é obrigatório.")
    private List<LoanItemDTO> items;

    public LoanDTO(Long id) {
        this.id = id;
    }
}
