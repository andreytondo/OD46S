package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.enums.LoanStatus;
import br.edu.utfpr.dainf.exception.WarnException;
import br.edu.utfpr.dainf.mail.Mail;
import br.edu.utfpr.dainf.mail.MailService;
import br.edu.utfpr.dainf.model.Loan;
import br.edu.utfpr.dainf.model.User;
import br.edu.utfpr.dainf.model.UserRecovery;
import br.edu.utfpr.dainf.repository.LoanRepository;
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

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class UserService extends CrudService<Long, User, UserRepository> implements UserDetailsService {

    private final PasswordEncoder passwordEncoder;
    private final UserRecoveryRepository userRecoveryRepository;
    private final MailService mailService;
    private final ConfigurationService configurationService;
    private final LoanRepository loanRepository;

    public UserService(PasswordEncoder passwordEncoder, UserRecoveryRepository userRecoveryRepository,
                       MailService mailService, ConfigurationService configurationService, LoanRepository loanRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRecoveryRepository = userRecoveryRepository;
        this.mailService = mailService;
        this.configurationService = configurationService;
        this.loanRepository = loanRepository;
    }

    @Override
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

    public void grantClearance(User user) {
        var ongoingLoans = loanRepository.findByBorrowerAndStatusIn(user, List.of(LoanStatus.ONGOING, LoanStatus.OVERDUE));
        if (!ongoingLoans.isEmpty()) throw new WarnException("O usuário ainda possui pendências");

        String to = configurationService.get().getClearanceEmailRecipient();
        if (to == null) throw new WarnException("Nenhum e-mail de destino informado. Acesse a tela de 'Configurações' para continuar");

        User dbUser = findById(user.getId()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        dbUser.setEnabled(false);
        dbUser.setClearanceDate(Instant.now());
        dbUser.setClearanceCode(UUID.randomUUID().toString());
        save(dbUser);

        LocalDateTime now = LocalDateTime.now();
        String clearance = mailService.buildTemplate("clearance", Map.of(
                "nomeAluno", user.getNome(),
                "matricula", user.getDocumento(),
                 "dia", now.getDayOfMonth(),
                "mes", now.getMonthValue(),
                "ano", now.getYear(),
                "codigoValidacao", dbUser.getClearanceCode(),
                "linkValidacao", "não implementado"

        ));
        mailService.send(Mail.builder()
                .subject("Documento de nada consta")
                .to(List.of(to))
                .content(clearance)
                .build());
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

//        String recoveryMail = mailService.buildTemplate("password-recovery2", Map.of());
//        mailService.send(Mail.builder()
//                .subject("Recuperação de senha")
//                .to(List.of(user.getEmail()))
//                .content(recoveryMail)
//                .build());
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
