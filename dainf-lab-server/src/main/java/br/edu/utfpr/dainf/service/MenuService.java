package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.config.MenuConfig;
import br.edu.utfpr.dainf.dto.MenuDTO;
import br.edu.utfpr.dainf.dto.MenuItemDTO;
import br.edu.utfpr.dainf.enums.UserRole;
import br.edu.utfpr.dainf.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MenuService {

    private final UserService userService;
    private final MenuConfig menuConfig;

    public MenuService(UserService userService) {
        this.userService = userService;
        this.menuConfig = new MenuConfig();
    }

    public MenuDTO getMenu() {
        User user = userService.getCurrentUser();

        if (user == null) {
            throw new IllegalStateException("User not authenticated");
        }

        UserRole role = user.getRole();
        return MenuDTO.builder()
                .items(filterMenuByRole(menuConfig.getMenuDefinition(), role))
                .build();
    }

    private List<MenuItemDTO> filterMenuByRole(List<MenuItemDTO> menu, UserRole role) {
        return menu.stream()
                .filter(item -> item.getAllowedRoles() == null || item.getAllowedRoles().isEmpty() || item.getAllowedRoles().contains(role))
                .map(item -> {
                    List<MenuItemDTO> filteredChildren = item.getItems() != null
                            ? filterMenuByRole(item.getItems(), role)
                            : null;
                    return item.toBuilder().items(filteredChildren).build();
                })
                .filter(item -> item.getItems() == null || !item.getItems().isEmpty())
                .collect(Collectors.toList());
    }
}