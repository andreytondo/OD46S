package br.edu.utfpr.dainf.dto;

import br.edu.utfpr.dainf.shared.Identifiable;
import lombok.*;

import java.time.Instant;
import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class IssueDTO implements Identifiable<Long> {
    private Long id;
    private Instant date;
    private String observation;
    private SimpleUserDTO user;
    private List<IssueItemDTO> items;
}
