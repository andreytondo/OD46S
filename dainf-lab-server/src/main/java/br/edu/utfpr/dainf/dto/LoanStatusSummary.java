package br.edu.utfpr.dainf.dto;

public record LoanStatusSummary (
        Long ongoingCount,
        Long overdueCount,
        Long completedCount,
        Long totalCount
) { }