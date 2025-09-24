package br.edu.utfpr.dainf.model;

import br.edu.utfpr.dainf.enums.LoanStatus;
import br.edu.utfpr.dainf.shared.Identifiable;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "loan_item")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoanItem implements Identifiable<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "loan_id", referencedColumnName = "id")
    private Loan loan;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "item_id", referencedColumnName = "id")
    private Item item;

    @Column(name = "return", nullable = false)
    private boolean shouldReturn;

    @Column(name = "quantity", nullable = false)
    private boolean quantity;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private LoanStatus status;
}
