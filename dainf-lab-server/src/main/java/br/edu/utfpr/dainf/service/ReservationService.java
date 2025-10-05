package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.model.Purchase;
import br.edu.utfpr.dainf.model.Reservation;
import br.edu.utfpr.dainf.repository.PurchaseRepository;
import br.edu.utfpr.dainf.repository.ReservationRepository;
import br.edu.utfpr.dainf.shared.CrudService;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Service;

@Service
public class ReservationService extends CrudService<Long, Reservation, ReservationRepository> {

    @Override
    public JpaSpecificationExecutor<Reservation> getSpecExecutor() {
        return repository;
    }

    @Override
    public Reservation save(Reservation entity) {
        if (entity.getItems() != null) {
            entity.getItems().forEach(item -> item.setReservation(entity));
        }
        return super.save(entity);
    }
}
