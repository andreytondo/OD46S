package br.edu.utfpr.dainf.dto;

import br.edu.utfpr.dainf.enums.UserRole;
import br.edu.utfpr.dainf.model.User;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserSignupDTO {

    @NotBlank(message = "O nome é obrigatório.")
    @Size(max = 255, message = "O nome não pode exceder 255 caracteres.")
    private String nome;

    @NotBlank(message = "O e-mail é obrigatório.")
    @Email(message = "O e-mail é inválido.")
    private String email;

    @Size(max = 25, message = "O RA/Sinep não pode exceder 25 caracteres.")
    private String documento;

    @NotBlank(message = "O telefone é obrigatório.")
    @Size(max = 15, message = "O telefone não pode exceder 15 caracteres.")
    private String telefone;

    @NotNull(message = "A senha é obrigatória.")
    @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres.")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número.")
    private String password;

    public User toUserModel() {
        return new User(
                null,
                this.email,
                this.password,
                this.nome,
                this.documento,
                this.telefone,
                null,
                false,
                UserRole.ROLE_STUDENT,
                true
        );
    }
}

