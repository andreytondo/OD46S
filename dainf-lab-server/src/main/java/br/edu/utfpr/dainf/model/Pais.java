package br.edu.utfpr.dainf.model;

import br.edu.utfpr.dainf.shared.Identifiable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "app_pais")
public class Pais implements Identifiable<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nome", length = 50, nullable = false)
    @NotBlank(message = "O país precisa de um nome")
    private String nome;

    @Column(name = "sigla", length = 3, nullable = false)
    @NotBlank(message = "O país precisa de uma sigla")
    private String sigla;
}