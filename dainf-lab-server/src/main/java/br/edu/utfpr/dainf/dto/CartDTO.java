package br.edu.utfpr.dainf.dto;

import br.edu.utfpr.dainf.enums.UnidadeFederativa;
import br.edu.utfpr.dainf.model.CartItem;
import br.edu.utfpr.dainf.model.User;
import br.edu.utfpr.dainf.shared.Identifiable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartDTO implements Identifiable<Long> {

    private Long id;
    private SimpleUserDTO user;
    private List<CartItemDTO> items;

    public CartDTO(Long id) {
        this.id = id;
    }
}
