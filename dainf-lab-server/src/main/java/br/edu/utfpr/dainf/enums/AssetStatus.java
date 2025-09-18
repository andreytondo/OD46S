package br.edu.utfpr.dainf.enums;

import lombok.Getter;

public enum AssetStatus {
    AVAILABLE("Disponível"),
    LOANED("Emprestado"),
    RESERVED("Reservado"),
    UNDER_MAINTENANCE("Em manutenção");

    @Getter
    private final String description;

    AssetStatus(String description) {
        this.description = description;
    }
}
