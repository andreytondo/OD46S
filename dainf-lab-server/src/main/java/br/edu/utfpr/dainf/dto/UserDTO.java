package br.edu.utfpr.dainf.dto;

import br.edu.utfpr.dainf.shared.Identifiable;
import br.edu.utfpr.dainf.validator.ValidUser;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@ValidUser
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO implements Identifiable<Long> {

    private Long id;

    @Email(message = "O atributo email deve ser um email válido.")
    private String email;

    @Size(min = 6, max = 100, message = "O atributo password deve conter no mínimo 6 caracteres.")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula e um número.")
    private String password;

    private String nome;

    private String documento;

    private String telefone;

    private String fotoUrl;

    private boolean emailVerificado;

    public UserDTO(Long id) {
        this.id = id;
    }
}
