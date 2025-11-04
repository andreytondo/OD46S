package br.edu.utfpr.dainf.model;

import br.edu.utfpr.dainf.enums.UserRole;
import br.edu.utfpr.dainf.shared.Identifiable;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.envers.Audited;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Entity
@Table(name = "app_user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Audited
public class User implements UserDetails, Identifiable<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email(message = "O e-mail é inválido.")
    private String email;

    @NotNull(message = "A senha é obrigatória.")
    @Size(min = 6)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$")
    private String password;

    @Column(nullable = false)
    private String nome;

    @Column(length = 25)
    private String documento;

    @Column(length = 15, nullable = false)
    private String telefone;

    @Column(length = 2048)
    private String fotoUrl;

    @Column(name = "email_verificado")
    private boolean emailVerificado;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    public boolean getEmailVerificado() {
        return emailVerificado;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Optional.ofNullable(this.role)
                .map(UserRole::name)
                .map(SimpleGrantedAuthority::new)
                .map(List::of)
                .orElse(List.of());
    }

    @Override
    public String getUsername() {
        return getEmail();
    }
}
