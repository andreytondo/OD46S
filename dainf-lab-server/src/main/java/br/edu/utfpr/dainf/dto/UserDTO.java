package br.edu.utfpr.dainf.dto;

import br.edu.utfpr.dainf.validator.ValidUser;
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
public class UserDTO {

    private Long id;

    @NotNull(message = "O atributo username não pode ser nulo.")
    @Size(min = 4, max = 50, message = "O atributo username deve conter no mínimo 4 caracteres.")
    private String username;

    @NotNull(message = "O atributo password não pode ser nulo.")
    @Size(min = 6, max = 100, message = "O atributo password deve conter no mínimo 6 caracteres.")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula e um número.")
    private String password;

    public UserDTO(Long id) {
        this.id = id;
    }
}
