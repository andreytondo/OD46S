package br.edu.utfpr.dainf.dto;

import br.edu.utfpr.dainf.model.Loan;
import br.edu.utfpr.dainf.model.LoanItem;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
public class LoanItemTrackingDTO {

    private Long loanItemId;
    private BigDecimal quantity;
    private Long loanId;
    private String observation;
    private Instant loanDate;
    private Instant deadline;
    private String borrowerName;
    private String borrowerEmail;
    private Long borrowerId;

    public LoanItemTrackingDTO(LoanItem loanItem) {
        this.loanItemId = loanItem.getId();
        this.quantity = loanItem.getQuantity();

        Loan loan = loanItem.getLoan();
        if (loan != null) {
            this.loanId = loan.getId();
            this.observation = loan.getObservation();
            this.loanDate = loan.getLoanDate();
            this.deadline = loan.getDeadline();

            if (loan.getBorrower() != null) {
                this.borrowerId = loan.getBorrower().getId();
                this.borrowerName = loan.getBorrower().getNome();
                this.borrowerEmail = loan.getBorrower().getEmail();
            }
        }
    }
}