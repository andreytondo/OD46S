package br.edu.utfpr.dainf.dto;

import br.edu.utfpr.dainf.enums.UnidadeFederativa;
import br.edu.utfpr.dainf.shared.Identifiable;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CidadeDTO implements Identifiable<Long> {

    private Long id;

    @NotEmpty(message = "O campo 'Nome' é de preenchimento obrigatório.")
    @Size(max = 60, message = "O campo 'Nome' deve ter no máximo 60 caracteres.")
    private String nome;

    @NotNull(message = "O campo 'Estado' deve ser selecionado.")
    private UnidadeFederativa estado;

    public CidadeDTO(Long id) {
        this.id = id;
    }
}
