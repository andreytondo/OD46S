package br.edu.utfpr.dainf.enums;

import lombok.Getter;

public enum LoanStatus {
    PENDENTE("Em andamento"),
    ATRASADO("Atrasado"),
    DEVOLVIDO("Devolvido");

    @Getter
    private final String status;

    LoanStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return status;
    }
}
