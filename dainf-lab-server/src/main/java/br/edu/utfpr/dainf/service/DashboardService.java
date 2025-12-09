package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.dto.DashboardDTO;
import br.edu.utfpr.dainf.model.User;
import br.edu.utfpr.dainf.repository.LoanRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class DashboardService {

    private final LoanRepository loanRepository;
    private final UserService userService;

    public DashboardService(LoanRepository loanRepository, UserService userService) {
        this.loanRepository = loanRepository;
        this.userService = userService;
    }

    public DashboardDTO getDashboardData(LocalDate startDate, LocalDate endDate) {
        User currentUser = userService.getCurrentUser();
        boolean hasAdvancedPrivileges = currentUser != null && userService.hasPrivilegedAcess();

        if (currentUser == null) {
            throw new AccessDeniedException("Usuário não autenticado");
        }

        return new DashboardDTO(
                hasAdvancedPrivileges
                        ? loanRepository.countByStatus()
                        : loanRepository.countByStatusForBorrower(currentUser.getId()),
                hasAdvancedPrivileges
                        ? loanRepository.countLoansByDay(startDate, endDate)
                        : loanRepository.countLoansByDayForBorrower(startDate, endDate, currentUser.getId())
            );
    }
}
