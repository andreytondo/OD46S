package br.edu.utfpr.dainf.dto;

import br.edu.utfpr.dainf.enums.UnidadeFederativa;
import br.edu.utfpr.dainf.model.Cidade;
import br.edu.utfpr.dainf.shared.Identifiable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.br.CNPJ;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FornecedorDTO implements Identifiable<Long> {

    private Long id;

    @NotEmpty(message = "O campo 'Razão Social' é de preenchimento obrigatório.")
    @Size(max = 80, message = "O campo 'Razão Social' deve ter no máximo 80 caracteres.")
    private String razaoSocial;

    @NotEmpty(message = "O campo 'Nome Fantasia' é de preenchimento obrigatório.")
    @Size(max = 80, message = "O campo 'Nome Fantasia' deve ter no máximo 80 caracteres.")
    private String nomeFantasia;

    @NotEmpty(message = "O campo 'CNPJ' é de preenchimento obrigatório.")
    @Size(min = 14, max = 14, message = "O campo 'CNPJ' deve conter exatamente 14 caracteres.")
    @CNPJ(message = "O CNPJ informado é inválido")
    private String cnpj;

    @NotEmpty(message = "O campo 'Inscrição Estadual' é de preenchimento obrigatório.")
    @Size(max = 14, message = "O campo 'Inscrição Estadual' deve ter no máximo 14 caracteres.")
    private String ie;

    @NotEmpty(message = "O campo 'Endereço' é de preenchimento obrigatório.")
    @Size(max = 100, message = "O campo 'Endereço' deve ter no máximo 100 caracteres.")
    private String endereco;

    @Size(max = 2000, message = "O campo 'Observação' deve ter no máximo 2000 caracteres.")
    private String observacao;

    @NotEmpty(message = "O campo 'Email' é de preenchimento obrigatório.")
    @Email(message = "O campo 'Email' deve ser um endereço de e-mail válido.")
    private String email;

    @NotEmpty(message = "O campo 'Telefone' é de preenchimento obrigatório.")
    @Size(max = 15, message = "O campo 'Telefone' deve ter no máximo 15 caracteres.")
    private String telefone;

    @NotNull(message = "O campo 'Cidade' deve ser selecionado.")
    private Cidade cidade;

    @NotNull(message = "O campo 'Estado' deve ser selecionado.")
    private UnidadeFederativa estado;

    public FornecedorDTO(Long id) {
        this.id = id;
    }
}
