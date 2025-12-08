package br.edu.utfpr.dainf.model;

import br.edu.utfpr.dainf.enums.LoanStatus;
import br.edu.utfpr.dainf.shared.Identifiable;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.envers.Audited;

import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "loan")
@Audited
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Loan implements Identifiable<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User borrower;

    @Column(name = "loan_date")
    @NotNull(message = "Deve ser informado a data de do emprestimo.")
    private Instant loanDate;

    @Column(name = "deadline")
    private Instant deadline;

    @Column(name = "observation")
    private String observation;

    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LoanItem> items;

    @Enumerated(EnumType.STRING)
    private LoanStatus status;
}
