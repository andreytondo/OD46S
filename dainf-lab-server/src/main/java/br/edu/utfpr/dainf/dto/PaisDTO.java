package br.edu.utfpr.dainf.dto;

import br.edu.utfpr.dainf.shared.Identifiable;
import br.edu.utfpr.dainf.validator.ValidUser;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaisDTO implements Identifiable<Long> {

    private Long id;

    @NotBlank(message = "O país precisa de um nome")
    @Size(max = 50, message = "O nome do país deve ter no máximo 50 caracteres.")
    private String nome;

    @NotBlank(message = "O país precisa de uma sigla")
    @Size(max = 3, message = "A sigla do país deve ter no máximo 3 caracteres.")
    private String sigla;

    public PaisDTO(Long id) {
        this.id = id;
    }
}
