package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.CartDTO;
import br.edu.utfpr.dainf.dto.CartItemDTO;
import br.edu.utfpr.dainf.dto.CidadeDTO;
import br.edu.utfpr.dainf.enums.UserRole;
import br.edu.utfpr.dainf.model.Cart;
import br.edu.utfpr.dainf.model.Cidade;
import br.edu.utfpr.dainf.repository.CidadeRepository;
import br.edu.utfpr.dainf.service.CartService;
import br.edu.utfpr.dainf.service.CidadeService;
import br.edu.utfpr.dainf.shared.BaseController;
import br.edu.utfpr.dainf.shared.CrudController;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("carts")
@RolesAllowed({UserRole.ADMIN, UserRole.LAB_TECHNICIAN, UserRole.PROFESSOR, UserRole.STUDENT})
public class CartController extends BaseController<Long, Cart, CartDTO> {

    @Autowired
    private CartService service;

    public CartController() {
        super(Cart.class, CartDTO.class);
    }

    @GetMapping
    public ResponseEntity<List<CartItemDTO>> findCart() {
        return new ResponseEntity<>(super.toDto(service.findCart()).getItems(), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<List<CartItemDTO>> manageCart(@RequestBody @Valid List<CartItemDTO> items) {
        return new ResponseEntity<>(
                super.toDto(service.manageCart(items)).getItems(),
                HttpStatus.OK
        );
    }
}
