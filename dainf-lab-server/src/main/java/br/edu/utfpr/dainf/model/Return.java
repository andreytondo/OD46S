package br.edu.utfpr.dainf.model;

import br.edu.utfpr.dainf.shared.Identifiable;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.envers.Audited;

import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "return")
@Getter
@Setter
@Audited
@NoArgsConstructor
@AllArgsConstructor
public class Return implements Identifiable<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "loan_id", referencedColumnName = "id")
    private Loan loan;

    @Column(name = "return_date")
    private Instant returnDate;

    @Column(name = "observation")
    private String observation;

    @OneToMany(mappedBy = "aReturn", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReturnItem> items;
}
