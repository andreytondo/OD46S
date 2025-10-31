package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.dto.CartItemDTO;
import br.edu.utfpr.dainf.model.Cart;
import br.edu.utfpr.dainf.model.CartItem;
import br.edu.utfpr.dainf.model.Item;
import br.edu.utfpr.dainf.model.User;
import br.edu.utfpr.dainf.repository.CartRepository;
import br.edu.utfpr.dainf.repository.ItemRepository;
import br.edu.utfpr.dainf.shared.CrudService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {

    private final CartRepository repository;
    private final ItemRepository itemRepository;
    private final UserService userService;

    public CartService(CartRepository repository, ItemRepository itemRepository, UserService userService) {
        this.repository = repository;
        this.itemRepository = itemRepository;
        this.userService = userService;
    }

    public Cart manageCart(List<CartItemDTO> itemsDTO) {
        Cart cart = findCart();
        cart.getItems().clear();

        if (itemsDTO != null) {
            List<CartItem> newCartItems = itemsDTO.stream()
                    .map(dto -> {
                        Item item = itemRepository.findById(dto.getItem().getId())
                                .orElseThrow(() -> new EntityNotFoundException("Item não encontrado com ID: " + dto.getItem().getId()));

                        CartItem cartItem = new CartItem();
                        cartItem.setItem(item);
                        cartItem.setQuantity(dto.getQuantity());
                        cartItem.setCart(cart);

                        return cartItem;
                    })
                    .collect(Collectors.toList());

            cart.getItems().addAll(newCartItems);
        }

        return repository.save(cart);
    }


    public Cart findCart() {
        User user = userService.getCurrentUser();
        return repository.findByUser(user)
            .orElseGet(() -> {
                Cart newCart = new Cart();
                newCart.setUser(user);
                return repository.save(newCart);
            });
    }
}
