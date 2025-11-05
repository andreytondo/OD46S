package br.edu.utfpr.dainf.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MenuDTO {
    private List<MenuItemDTO> items;
}
