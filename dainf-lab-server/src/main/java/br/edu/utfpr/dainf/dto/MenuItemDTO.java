package br.edu.utfpr.dainf.dto;

import br.edu.utfpr.dainf.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.util.List;
import java.util.Set;

@Data
@Builder(toBuilder = true)
public class MenuItemDTO {
    private String label;
    private String icon;
    private String routerLink;
    private List<MenuItemDTO> items;

    @JsonIgnore
    @Singular
    private Set<UserRole> allowedRoles;
}
