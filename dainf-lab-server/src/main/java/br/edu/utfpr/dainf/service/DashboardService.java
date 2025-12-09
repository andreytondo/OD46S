package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.dto.DashboardDTO;
import br.edu.utfpr.dainf.model.User;
import br.edu.utfpr.dainf.repository.InventoryRepository;
import br.edu.utfpr.dainf.repository.InventoryTransactionRepository;
import br.edu.utfpr.dainf.repository.LoanRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;

import java.time.LocalDate;
import java.util.List;

@Service
public class DashboardService {

    private final LoanRepository loanRepository;
    private final UserService userService;
    private final InventoryRepository inventoryRepository;
    private final InventoryTransactionRepository inventoryTransactionRepository;

    public DashboardService(
            LoanRepository loanRepository,
            UserService userService,
            InventoryRepository inventoryRepository,
            InventoryTransactionRepository inventoryTransactionRepository
    ) {
        this.loanRepository = loanRepository;
        this.userService = userService;
        this.inventoryRepository = inventoryRepository;
        this.inventoryTransactionRepository = inventoryTransactionRepository;
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
                        : loanRepository.countLoansByDayForBorrower(startDate, endDate, currentUser.getId()),
                hasAdvancedPrivileges
                        ? inventoryRepository.findItemsBelowMinimumStock()
                        : List.of(),
                hasAdvancedPrivileges
                        ? inventoryTransactionRepository.findRecentOperations(PageRequest.of(0, 8))
                        : List.of()
            );
    }
}
