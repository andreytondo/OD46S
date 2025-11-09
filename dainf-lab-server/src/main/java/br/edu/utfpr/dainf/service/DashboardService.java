package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.dto.DashboardDTO;
import br.edu.utfpr.dainf.repository.LoanRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;

@Service
public class DashboardService {

    private final LoanRepository loanRepository;

    public DashboardService(LoanRepository loanRepository) {
        this.loanRepository = loanRepository;
    }

    public DashboardDTO getDashboardData(LocalDate startDate, LocalDate endDate) {
        return new DashboardDTO(
                loanRepository.countByStatus(),
                loanRepository.countLoansByDay(startDate, endDate)
            );
    }
}
