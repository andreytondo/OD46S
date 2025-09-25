package br.edu.utfpr.dainf.model;

import br.edu.utfpr.dainf.enums.LoanStatus;
import br.edu.utfpr.dainf.shared.Identifiable;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "loan")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Loan implements Identifiable<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User borrower;

    @Column(name = "loan_date")
    private Instant loanDate;

    @Column(name = "deadline")
    private Instant deadline;

    @Column(name = "devolution_date")
    private Instant devolutionDate;

    @Column(name = "observation", length = 255)
    private String observation;

    @Column(name = "ra_siape", nullable = false)
    private String raSiape;

    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LoanItem> items;
}
