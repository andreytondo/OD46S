package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.model.Loan;
import br.edu.utfpr.dainf.repository.LoanRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.List;

@Component
public class LoanStatusScheduler {

    private final LoanRepository loanRepository;
    private final LoanService loanService;

    public LoanStatusScheduler(LoanRepository loanRepository, LoanService loanService) {
        this.loanRepository = loanRepository;
        this.loanService = loanService;
    }

    @Scheduled(cron = "* * 1 * * *")
    public void markOverdueLoans() {
        List<Loan> candidates = loanRepository.findNonCompletedPastDeadline(Instant.now());
        candidates.forEach(loanService::refreshStatus);
    }
}
