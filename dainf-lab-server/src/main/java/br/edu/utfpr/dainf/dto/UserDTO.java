package br.edu.utfpr.dainf.dto;

import br.edu.utfpr.dainf.enums.UserRole;
import br.edu.utfpr.dainf.shared.Identifiable;
import br.edu.utfpr.dainf.validator.ValidUser;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@ValidUser
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO implements Identifiable<Long> {

    private static final String UTFPR_EMAIL_PATTERN = "^[^@\\s]+@(utfpr\\.edu\\.br|alunos\\.utfpr\\.edu\\.br|professores\\.utfpr\\.edu\\.br)$";

    private Long id;

    @Email(message = "O atributo email deve ser um email válido.")
    @Pattern(regexp = UTFPR_EMAIL_PATTERN, flags = Pattern.Flag.CASE_INSENSITIVE, message = "O e-mail deve ser institucional da UTFPR.")
    private String email;

    @Pattern(
            regexp = "^(|(?=.{6,100}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*)$",
            message = "Quando informada, a senha deve ter entre 6 e 100 caracteres e conter pelo menos uma letra minúscula, uma letra maiúscula e um número."
    )
    private String password;

    private String nome;

    private String documento;

    private String telefone;

    private String fotoUrl;

    private boolean emailVerificado;

    private UserRole role;

    private boolean enabled;

    public UserDTO(Long id) {
        this.id = id;
    }
}
