package br.edu.utfpr.dainf.dto;

import br.edu.utfpr.dainf.model.Loan;
import br.edu.utfpr.dainf.shared.Identifiable;
import lombok.*;

import java.time.Instant;
import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReturnDTO implements Identifiable<Long> {
    private Long id;
    private String observation;
    private Instant returnDate;
    private LoanDTO loan;
    private List<ReturnItemDTO> items;
}
