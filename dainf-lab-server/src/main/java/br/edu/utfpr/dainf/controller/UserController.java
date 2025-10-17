package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.UserDTO;
import br.edu.utfpr.dainf.enums.UserRole;
import br.edu.utfpr.dainf.model.User;
import br.edu.utfpr.dainf.repository.UserRepository;
import br.edu.utfpr.dainf.service.UserService;
import br.edu.utfpr.dainf.shared.CrudController;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("users")
@RolesAllowed(UserRole.ADMIN)
public class UserController extends CrudController<Long, User, UserDTO, UserRepository, UserService> {

    public UserController() {
        super(User.class, UserDTO.class);
    }

    @Override
    public UserDTO toDto(User entity) {
        UserDTO dto = super.toDto(entity);
        dto.setPassword(null);
        return dto;
    }
}