package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.PurchaseDTO;
import br.edu.utfpr.dainf.dto.ReservationDTO;
import br.edu.utfpr.dainf.model.Purchase;
import br.edu.utfpr.dainf.model.Reservation;
import br.edu.utfpr.dainf.repository.PurchaseRepository;
import br.edu.utfpr.dainf.repository.ReservationRepository;
import br.edu.utfpr.dainf.service.PurchaseService;
import br.edu.utfpr.dainf.service.ReservationService;
import br.edu.utfpr.dainf.shared.CrudController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("reservations")
public class ReservationController extends CrudController<Long, Reservation, ReservationDTO, ReservationRepository, ReservationService> {
    public ReservationController() {
        super(Reservation.class, ReservationDTO.class);
    }
}
