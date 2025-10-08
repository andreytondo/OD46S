package br.edu.utfpr.dainf.dto;

import br.edu.utfpr.dainf.model.User;
import br.edu.utfpr.dainf.shared.Identifiable;
import lombok.*;

import java.time.Instant;
import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDTO implements Identifiable<Long> {
    private Long id;
    private String description;
    private String observation;
    private Instant reservationDate;
    private Instant withdrawalDate;
    private User user;
    private List<ReservationItemDTO> items;

}
