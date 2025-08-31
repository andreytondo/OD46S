package br.edu.utfpr.dainf.validator;

import br.edu.utfpr.dainf.dto.UserDTO;
import br.edu.utfpr.dainf.model.User;
import br.edu.utfpr.dainf.repository.UserRepository;
import jakarta.validation.ConstraintValidatorContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserValidatorTest {

    @Mock
    private UserRepository repository;

    @Spy
    @InjectMocks
    private UserValidator userValidator;

    @Mock
    private ConstraintValidatorContext context;

    private UserDTO user;

    @BeforeEach
    void setUp() {
        user = mock(UserDTO.class);
        lenient().when(user.getId()).thenReturn(1L);
        lenient().when(user.getEmail()).thenReturn("testuser@mail.com");
        lenient().doNothing().when(userValidator).handleMessage(any(), any(), any());
    }

    @Test
    @DisplayName("Should return true when user is valid")
    void testIsValid_withValidUser() {
        when(repository.findByEmail("testuser@mail.com")).thenReturn(null);
        assertTrue(userValidator.isValid(user, context));
    }

    @Test
    @DisplayName("Should return false when username is not unique")
    void testIsValid_withNonUniqueUsername() {
        User existingUser = new User(2L, "testuser@mail.com", "Teste123!@#");
        when(repository.findByEmail("testuser@mail.com")).thenReturn(Optional.of(existingUser));
        assertFalse(userValidator.isValid(user, context));
    }

    @Test
    @DisplayName("Should return true when username is unique and user is being updated")
    void testIsValid_withUniqueUsernameUpdate() {
        User existingUser = new User(1L, "testuser@mail.com", "Teste123!@#");
        when(repository.findByEmail("testuser@mail.com")).thenReturn(Optional.of(existingUser));
        assertTrue(userValidator.isValid(user, context));
    }

}