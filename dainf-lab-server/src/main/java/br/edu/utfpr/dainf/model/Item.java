package br.edu.utfpr.dainf.model;

import br.edu.utfpr.dainf.enums.ItemType;
import br.edu.utfpr.dainf.shared.Identifiable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "item")
public class Item implements Identifiable<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotBlank
    @NotNull
    @NotEmpty(message = "O campo 'Nome' é obrigatório")
    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @Column(name = "description", columnDefinition = "text")
    private String description;

    @Column(name = "`price`", precision = 19, scale = 2)
    private BigDecimal price;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Asset> assets;

    private String siorg;

    private BigDecimal minimumStock;

    @Enumerated(EnumType.STRING)
    private ItemType type;
}
