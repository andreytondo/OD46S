package br.edu.utfpr.dainf.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class AssetDTO {
    private Long id;
    private ItemDTO item;
    private String location;
    private String identifier;
}
