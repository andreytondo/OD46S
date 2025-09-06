package br.edu.utfpr.dainf.model;

import br.edu.utfpr.dainf.enums.UnidadeFederativa;
import br.edu.utfpr.dainf.shared.Identifiable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "app_estado")
public class Estado implements Identifiable<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "uf")
    private UnidadeFederativa uf;

    @ManyToOne
    @JoinColumn(name = "pais_id", referencedColumnName = "id")
    private Pais pais;
}

