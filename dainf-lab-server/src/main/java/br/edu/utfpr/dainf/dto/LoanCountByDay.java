package br.edu.utfpr.dainf.dto;

import java.time.LocalDate;

public interface LoanCountByDay {
    LocalDate getDay();
    Long getTotal();
}
