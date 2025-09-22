package br.edu.utfpr.dainf.model;

import br.edu.utfpr.dainf.shared.Identifiable;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "purchase")
public class Purchase implements Identifiable<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull(message = "O campo 'Data de Compra' deve ser selecionado.")
    @Column(name = "date", nullable = false)
    private Instant date;

    @NotNull(message = "O campo 'Fornecedor' deve ser escolhido.")
    @ManyToOne
    @JoinColumn(name = "fornecedor_id", referencedColumnName = "id")
    private Fornecedor fornecedor;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @NotNull(message = "Deve ser escolhido ao menos 1 produto.")
    @OneToMany(mappedBy = "purchase",
            cascade = {CascadeType.ALL}, orphanRemoval = true)
    private List<PurchaseItem> items;
}
