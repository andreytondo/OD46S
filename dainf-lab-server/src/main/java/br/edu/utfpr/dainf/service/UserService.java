package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.model.User;
import br.edu.utfpr.dainf.model.UserRecovery;
import br.edu.utfpr.dainf.repository.UserRecoveryRepository;
import br.edu.utfpr.dainf.repository.UserRepository;
import br.edu.utfpr.dainf.shared.CrudService;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class UserService extends CrudService<Long, User, UserRepository> implements UserDetailsService {

    private final PasswordEncoder passwordEncoder;

    private final UserRecoveryRepository userRecoveryRepository;

    public UserService(PasswordEncoder passwordEncoder, UserRecoveryRepository userRecoveryRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRecoveryRepository = userRecoveryRepository;
    }

    public User save(User user) {
        if (user.getId() != null && user.getPassword() == null) {
            user.setPassword(repository.findById(user.getId())
                    .orElseThrow(() -> new IllegalArgumentException("User not found"))
                    .getPassword());
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return repository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public JpaSpecificationExecutor<User> getSpecExecutor() {
        return repository;
    }

    public void forgotPassword(String email) {
        UserRecovery recovery = new UserRecovery();

        User user = repository.findByEmail(email).orElseThrow(()
                -> new UsernameNotFoundException("User not found"));

        String token = UUID.randomUUID().toString();

        recovery.setResetToken(token);
        recovery.setTokenExpirationDate(LocalDateTime.now().plusMinutes(30));
        recovery.setUser(user);
        userRecoveryRepository.save(recovery);

        // TODO implement real email service
        //emailService.sendPasswordResetEmail(user.getEmail(), token);
    }

    public void resetPassword(String token, String newPassword) {
        User user;

        UserRecovery recovery = userRecoveryRepository.findByResetToken(token).orElseThrow(()
                -> new UsernameNotFoundException("Invalid token"));

        if (recovery.getTokenExpirationDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expired");
        } else {
            user = recovery.getUser();

            user.setPassword(passwordEncoder.encode(newPassword));

            repository.save(user);
        }
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        return (User) authentication.getPrincipal();
    }
}
