package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.enums.LoanStatus;
import br.edu.utfpr.dainf.enums.UserRole;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
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
    @Value("${app.base-url:http://localhost:4200}")
    private String baseUrl;

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
        // Keep existing password when updating without providing a new one
        if (user.getId() != null && (user.getPassword() == null || user.getPassword().isBlank())) {
            user.setPassword(repository.findById(user.getId())
                    .orElseThrow(() -> new IllegalArgumentException("User not found"))
                    .getPassword());
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return repository.save(user);
    }

    public void register(User user) {
        user.setEnabled(false);
        user.setEmailVerificado(false);
        user.setEmailVerificationToken(UUID.randomUUID().toString());
        user.setEmailVerificationExpiresAt(Instant.now().plus(24, ChronoUnit.HOURS));

        User saved = save(user);

        String mailContent = mailService.buildTemplate("email-verification", Map.of(
                "nome", saved.getNome(),
                "linkConfirmacao", builConfirmationLink(saved.getEmailVerificationToken())
        ));

        mailService.send(Mail.builder()
                .subject("Confirmação de e-mail")
                .to(List.of(saved.getEmail()))
                .content(mailContent)
                .build());
    }

    public void confirmEmail(String token) {
        User user = repository.findByEmailVerificationToken(token)
                .orElseThrow(() -> new UsernameNotFoundException("Token inválido"));

        if (user.getEmailVerificationExpiresAt() != null &&
                user.getEmailVerificationExpiresAt().isBefore(Instant.now())) {
            throw new WarnException("Token expirado. Solicite um novo cadastro.");
        }

        user.setEmailVerificado(true);
        user.setEnabled(true);
        user.setEmailVerificationToken(null);
        user.setEmailVerificationExpiresAt(null);
        repository.save(user);
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
                "linkValidacao", buildClearanceLink(dbUser.getClearanceCode())

        ));
        mailService.send(Mail.builder()
                .subject("Documento de nada consta")
                .to(List.of(to))
                .cc(dbUser.getEmail() == null || dbUser.getEmail().isBlank() ? null : List.of(dbUser.getEmail()))
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

        String recoveryMail = mailService.buildTemplate("password-recovery2", Map.of(
                "mutuario", user.getNome(),
                "linkRecuperacao", buildResetLink(token),
                "codigoRecuperacao", token,
                "expiracaoMinutos", 30
        ));

        mailService.send(Mail.builder()
                .subject("Recuperação de senha")
                .to(List.of(user.getEmail()))
                .content(recoveryMail)
                .build());
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

    public boolean hasPrivilegedAcess() {
        String role = getCurrentUser().getRole().name();
        return List.of(UserRole.ADMIN, UserRole.LAB_TECHNICIAN).contains(role);
    }

    public Map<String, Object> validateClearance(String code) {
        User user = repository.findByClearanceCode(code)
                .orElseThrow(() -> new UsernameNotFoundException("Código inválido"));

        return Map.of(
                "nomeAluno", user.getNome(),
                "matricula", user.getDocumento(),
                "dataEmissao", user.getClearanceDate(),
                "codigoValidacao", user.getClearanceCode()
        );
    }

    private String buildResetLink(String token) {
        return buildLinkWithQuery("/reset-password", "token", token);
    }

    private String buildClearanceLink(String code) {
        return buildLinkWithQuery("/clearance", "code", code);
    }

    private String builConfirmationLink(String token) {
        return buildLinkWithQuery("/confirm-mail", "token", token);
    }

    private String buildLinkWithQuery(String path, String queryKey, String queryValue) {
        String base = baseUrl.endsWith("/") ? baseUrl.substring(0, baseUrl.length() - 1) : baseUrl;
        String normalizedPath = path.startsWith("/") ? path : "/" + path;
        String url = base + normalizedPath;
        return url + (url.contains("?") ? "&" : "?") + queryKey + "=" + queryValue;
    }
}
