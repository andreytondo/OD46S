package br.edu.utfpr.dainf.repository;

import br.edu.utfpr.dainf.model.Reservation;
import br.edu.utfpr.dainf.shared.CrudRepository;
import br.edu.utfpr.dainf.spec.ReservationSpecExecutor;

public interface ReservationRepository extends CrudRepository<Long, Reservation>, ReservationSpecExecutor {

}
