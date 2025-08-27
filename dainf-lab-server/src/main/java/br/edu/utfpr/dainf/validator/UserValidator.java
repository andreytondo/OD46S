package br.edu.utfpr.dainf.validator;

import br.edu.utfpr.dainf.dto.UserDTO;
import br.edu.utfpr.dainf.model.User;
import br.edu.utfpr.dainf.repository.UserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Objects;

public class UserValidator implements ConstraintValidator<ValidUser, UserDTO> {

    @Autowired
    private UserRepository repository;

    @Override
    public boolean isValid(UserDTO entity, ConstraintValidatorContext context) {
        return validateUniqueUsername(entity, context);
    }

    boolean validateUniqueUsername(UserDTO entity, ConstraintValidatorContext context) {
        User user = repository.findByUsername(entity.getUsername());
        boolean valid = user == null || Objects.equals(user.getId(), entity.getId());

        if (!valid) {
            handleMessage(context, "O nome de usuário informado já está em uso", "username");
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
