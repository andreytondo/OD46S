package br.edu.utfpr.dainf.dto;

import br.edu.utfpr.dainf.model.Subcategory;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDTO {

    private Long id;

    @NotNull(message = "O nome da categoria não pode ser nulo")
    private String description;

    private List<Subcategory> subcategories;
}
