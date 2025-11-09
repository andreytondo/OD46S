package br.edu.utfpr.dainf.dto;

import java.util.List;

public record DashboardDTO(
        LoanStatusSummary loanSummary,
        List<LoanCountByDay> loanCountByDays
) { }