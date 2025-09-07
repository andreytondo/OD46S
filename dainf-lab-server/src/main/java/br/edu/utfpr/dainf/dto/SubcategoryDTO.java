package br.edu.utfpr.dainf.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SubcategoryDTO {

    private Long id;

    @NotNull(message = "A descrição da subcategoria não pode ser nula")
    private String description;

    @NotNull(message = "O ID da categoria pai não pode ser nulo")
    private Long categoryId;
}
