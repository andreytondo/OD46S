package br.edu.utfpr.dainf.dto;

import br.edu.utfpr.dainf.enums.AssetStatus;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AssetDTO {
    private Long id;
    private String location;
    private String serialNumber;
    private AssetStatus status;
}
