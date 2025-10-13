package br.edu.utfpr.dainf.dto;

import br.edu.utfpr.dainf.enums.ItemType;
import br.edu.utfpr.dainf.shared.Identifiable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ItemDTO implements Identifiable<Long> {
    private Long id;
    @NotBlank
    @NotNull
    @NotEmpty(message = "O campo 'Nome' é obrigatório")
    private String name;
    private String description;
    private BigDecimal price;
    private CategoryDTO category;
    private List<AssetDTO> assets;
    private String siorg;
    private BigDecimal quantity;
    private BigDecimal minimumStock;
    private ItemType type;
}
