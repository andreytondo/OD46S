package br.edu.utfpr.dainf.enums;

import lombok.Getter;

public enum ItemType {
    CONSUMABLE("Consumível"),
    DURABLE("Durável");

    @Getter
    private final String description;

    ItemType(String description) {
        this.description = description;
    }
}
