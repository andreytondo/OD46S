package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.enums.UserRole;
import br.edu.utfpr.dainf.model.Loan;
import br.edu.utfpr.dainf.model.Purchase;
import br.edu.utfpr.dainf.model.Reservation;
import br.edu.utfpr.dainf.model.User;
import br.edu.utfpr.dainf.repository.PurchaseRepository;
import br.edu.utfpr.dainf.repository.ReservationRepository;
import br.edu.utfpr.dainf.search.request.SearchRequest;
import br.edu.utfpr.dainf.search.request.filter.SearchFilter;
import br.edu.utfpr.dainf.shared.CrudService;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Objects;

@Service
public class ReservationService extends CrudService<Long, Reservation, ReservationRepository> {

    private final UserService userService;

    public ReservationService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public JpaSpecificationExecutor<Reservation> getSpecExecutor() {
        return repository;
    }

    @Override
    public Page<Reservation> search(SearchRequest request) {
        if (!userService.hasPrivilegedAcess()) {
            if (request.getFilters() == null) request.setFilters(new ArrayList<>());
            request.getFilters().add(new SearchFilter("user.id", userService.getCurrentUser().getId(), SearchFilter.Type.EQUALS));
        }

        return super.search(request);
    }

    @Override
    public Reservation save(Reservation entity) {
        validateAccess(entity);
        if (entity.getItems() != null) {
            entity.getItems().forEach(item -> item.setReservation(entity));
        }
        return super.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        var optEntity = findById(id);
        if (optEntity.isPresent()) {
            validateAccess(optEntity.get());
            super.deleteById(optEntity.get().getId());
        }
    }

    private void validateAccess(Reservation entity) {
        if (entity.getId() == null) return;

        var dbEntity = repository.findById(entity.getId()).orElse(null);
        if (dbEntity == null) return;

        if (!Objects.equals(dbEntity.getUser().getId(), userService.getCurrentUser().getId()) && !userService.hasPrivilegedAcess()) {
            throw new AccessDeniedException("Você não tem acesso para este registro");
        }
    }
}
