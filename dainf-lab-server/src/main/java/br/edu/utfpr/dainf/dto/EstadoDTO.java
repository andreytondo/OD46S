package br.edu.utfpr.dainf.dto;

import br.edu.utfpr.dainf.enums.UnidadeFederativa;
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
public class EstadoDTO implements Identifiable<Long> {

    private Long id;

    @NotEmpty(message = "O campo 'Nome' é de preenchimento obrigatório.")
    private String nome;

    @NotNull(message = "O campo 'UF' é de preenchimento obrigatório.")
    private UnidadeFederativa uf;

    @NotNull(message = "O campo 'País' deve ser selecionado.")
    private Long paisId;

    public EstadoDTO(Long id) {
        this.id = id;
    }
}
