package br.edu.utfpr.dainf.model;

import br.edu.utfpr.dainf.shared.Identifiable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "solicitation")
public class Solicitation implements Identifiable<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "description", columnDefinition = "text")
    private String description;


    @Column(name = "observation", columnDefinition = "text")
    private String observation;

    @NotNull(message = "O campo 'Data de Solicitação' deve ser selecionado.")
    @Column(name = "date", nullable = false)
    private Instant date;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @NotNull(message = "Deve ser escolhido ao menos 1 item.")
    @OneToMany(mappedBy = "solicitation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SolicitationItem> items;
}
