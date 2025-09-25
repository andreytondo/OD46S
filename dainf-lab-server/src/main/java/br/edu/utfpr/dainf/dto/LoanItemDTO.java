package br.edu.utfpr.dainf.dto;

import br.edu.utfpr.dainf.enums.LoanStatus;
import br.edu.utfpr.dainf.model.Item;
import br.edu.utfpr.dainf.model.Loan;
import br.edu.utfpr.dainf.model.LoanItem;
import br.edu.utfpr.dainf.shared.Identifiable;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoanItemDTO implements Identifiable<Long> {
    private Long id;

    private Loan loan;

    private Item item;

    @NotNull(message = "O campo 'Deve retornar?' é obrigatório.")
    private boolean shouldReturn;

    @NotNull(message = "O campo 'Quantidade' é obrigatório.")
    private boolean quantity;

    @NotNull(message = "O campo 'Status' é obrigatório.")
    private LoanStatus status;

    public LoanItemDTO(Long id) {
        this.id = id;
    }
}
