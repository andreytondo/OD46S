package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.ReservationDTO;
import br.edu.utfpr.dainf.dto.SolicitationDTO;
import br.edu.utfpr.dainf.enums.UserRole;
import br.edu.utfpr.dainf.model.Reservation;
import br.edu.utfpr.dainf.repository.ReservationRepository;
import br.edu.utfpr.dainf.search.request.SearchRequest;
import br.edu.utfpr.dainf.service.ReservationService;
import br.edu.utfpr.dainf.shared.CrudController;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.data.web.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("reservations")
@RolesAllowed({UserRole.ADMIN, UserRole.LAB_TECHNICIAN, UserRole.PROFESSOR, UserRole.STUDENT})
public class ReservationController extends CrudController<Long, Reservation, ReservationDTO, ReservationRepository, ReservationService> {
    public ReservationController() {
        super(Reservation.class, ReservationDTO.class);
    }

}
