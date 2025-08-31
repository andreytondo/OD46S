package br.edu.utfpr.dainf.validator;

import br.edu.utfpr.dainf.dto.UserDTO;
import br.edu.utfpr.dainf.model.User;
import br.edu.utfpr.dainf.repository.UserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Objects;
import java.util.Optional;

public class UserValidator implements ConstraintValidator<ValidUser, UserDTO> {

    @Autowired
    private UserRepository repository;

    @Override
    public boolean isValid(UserDTO entity, ConstraintValidatorContext context) {
        return validateUniqueUsername(entity, context);
    }

    boolean validateUniqueUsername(UserDTO entity, ConstraintValidatorContext context) {
        Optional<User> user = repository.findByEmail(entity.getEmail());
        boolean valid = user.isEmpty() || Objects.equals(user.get().getId(), entity.getId());

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
