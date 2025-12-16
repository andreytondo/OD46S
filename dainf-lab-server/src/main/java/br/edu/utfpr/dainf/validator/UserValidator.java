package br.edu.utfpr.dainf.validator;

import br.edu.utfpr.dainf.dto.UserDTO;
import br.edu.utfpr.dainf.dto.UserSignupDTO;
import br.edu.utfpr.dainf.model.User;
import br.edu.utfpr.dainf.repository.UserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Objects;
import java.util.Optional;

public class UserValidator implements ConstraintValidator<ValidUser, Object> {

    @Autowired
    private UserRepository repository;

    @Override
    public boolean isValid(Object entity, ConstraintValidatorContext context) {
        return switch (entity) {
            case UserDTO dto -> validateUniqueEmail(dto.getId(), dto.getEmail(), context);
            case UserSignupDTO dto -> validateUniqueEmail(null, dto.getEmail(), context);
            case null, default -> true;
        };
    }

    boolean validateUniqueEmail(Long id, String email, ConstraintValidatorContext context) {
        if (email == null) {
            return true;
        }

        Optional<User> user = repository.findByEmail(email);
        boolean valid = user.isEmpty() || Objects.equals(user.get().getId(), id);

        if (!valid) {
            handleMessage(context, "O e-mail informado já está em uso", "email");
        }

        return valid;
    }

    public void handleMessage(ConstraintValidatorContext context, String message, String node) {
        context.buildConstraintViolationWithTemplate(message)
                .addPropertyNode(node)
                .addConstraintViolation()
                .disableDefaultConstraintViolation();
    }
}
