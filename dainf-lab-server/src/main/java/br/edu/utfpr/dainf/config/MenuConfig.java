package br.edu.utfpr.dainf.config;

import br.edu.utfpr.dainf.dto.MenuItemDTO;
import br.edu.utfpr.dainf.enums.UserRole;

import java.util.List;
import java.util.Map;
import java.util.Set;

public class MenuConfig {

    private final Map<String, MenuItemDTO> baseItems = Map.ofEntries(
            Map.entry("dashboard", MenuItemDTO.builder()
                    .label("Dashboard").icon("pi pi-home").routerLink("dashboard")
                    .allowedRoles(Set.of(
                            UserRole.ROLE_ADMIN,
                            UserRole.ROLE_LAB_TECHNICIAN,
                            UserRole.ROLE_STUDENT,
                            UserRole.ROLE_PROFESSOR
                    ))
                    .build()),

            Map.entry("loan", MenuItemDTO.builder()
                    .label("Empréstimo").icon("pi pi-clock").routerLink("loan")
                    .allowedRoles(Set.of(UserRole.ROLE_ADMIN, UserRole.ROLE_LAB_TECHNICIAN))
                    .build()),

            Map.entry("issue", MenuItemDTO.builder()
                    .label("Saída").icon("pi pi-sign-out").routerLink("issue")
                    .allowedRoles(Set.of(UserRole.ROLE_ADMIN, UserRole.ROLE_LAB_TECHNICIAN))
                    .build()),

            Map.entry("reservation", MenuItemDTO.builder()
                    .label("Reserva").icon("pi pi-calendar").routerLink("reservation")
                    .allowedRoles(Set.of(
                            UserRole.ROLE_ADMIN,
                            UserRole.ROLE_LAB_TECHNICIAN,
                            UserRole.ROLE_STUDENT,
                            UserRole.ROLE_PROFESSOR
                    ))
                    .build()),

            Map.entry("purchase", MenuItemDTO.builder()
                    .label("Nova Compra").icon("pi pi-shopping-cart").routerLink("purchase")
                    .allowedRoles(Set.of(UserRole.ROLE_ADMIN, UserRole.ROLE_LAB_TECHNICIAN))
                    .build()),

            Map.entry("purchase-solicitation", MenuItemDTO.builder()
                    .label("Solicitar Compra").icon("pi pi-receipt").routerLink("purchase-solicitation")
                    .allowedRoles(Set.of(
                            UserRole.ROLE_ADMIN,
                            UserRole.ROLE_LAB_TECHNICIAN,
                            UserRole.ROLE_STUDENT,
                            UserRole.ROLE_PROFESSOR
                    ))
                    .build()),

            Map.entry("item", MenuItemDTO.builder()
                    .label("Itens").icon("pi pi-box").routerLink("item")
                    .allowedRoles(Set.of(
                            UserRole.ROLE_ADMIN,
                            UserRole.ROLE_LAB_TECHNICIAN,
                            UserRole.ROLE_STUDENT,
                            UserRole.ROLE_PROFESSOR
                    ))
                    .build()),

            Map.entry("category", MenuItemDTO.builder()
                    .label("Categorias").icon("pi pi-list").routerLink("category")
                    .allowedRoles(Set.of(UserRole.ROLE_ADMIN, UserRole.ROLE_LAB_TECHNICIAN))
                    .build()),

            Map.entry("supplier", MenuItemDTO.builder()
                    .label("Fornecedores").icon("pi pi-truck").routerLink("supplier")
                    .allowedRoles(Set.of(UserRole.ROLE_ADMIN, UserRole.ROLE_LAB_TECHNICIAN))
                    .build()),

            Map.entry("user", MenuItemDTO.builder()
                    .label("Usuários").icon("pi pi-users").routerLink("user")
                    .allowedRoles(Set.of(UserRole.ROLE_ADMIN))
                    .build()),

            Map.entry("config", MenuItemDTO.builder()
                    .label("Configurações").icon("pi pi-cog").routerLink("configuration")
                    .allowedRoles(Set.of(UserRole.ROLE_ADMIN))
                    .build())
    );

    public List<MenuItemDTO> getMenuDefinition() {
        return List.of(
                MenuItemDTO.builder()
                        .label("Início")
                        .items(List.of(baseItems.get("dashboard")))
                        .build(),
                MenuItemDTO.builder()
                        .label("Operações")
                        .items(List.of(
                                baseItems.get("loan"),
                                baseItems.get("issue"),
                                baseItems.get("reservation")
                        ))
                        .build(),
                MenuItemDTO.builder()
                        .label("Compras")
                        .items(List.of(
                                baseItems.get("purchase"),
                                baseItems.get("purchase-solicitation")
                        ))
                        .build(),
                MenuItemDTO.builder()
                        .label("Cadastros")
                        .items(List.of(
                                baseItems.get("item"),
                                baseItems.get("category"),
                                baseItems.get("supplier"),
                                baseItems.get("user")
                        ))
                        .build(),
                MenuItemDTO.builder()
                        .label("Sistema")
                        .items(List.of(
                                baseItems.get("config")
                        ))
                        .build()
        );
    }
}