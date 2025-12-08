package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.enums.UserRole;
import br.edu.utfpr.dainf.model.Reservation;
import br.edu.utfpr.dainf.model.Solicitation;
import br.edu.utfpr.dainf.model.User;
import br.edu.utfpr.dainf.repository.SolicitationRepository;
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
public class SolicitationService extends CrudService<Long, Solicitation, SolicitationRepository> {
    private final UserService userService;

    public SolicitationService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public JpaSpecificationExecutor<Solicitation> getSpecExecutor() {
        return repository;
    }

    @Override
    public Page<Solicitation> search(SearchRequest request) {
        User currentUser = userService.getCurrentUser();

        boolean isRestricted = !currentUser.getRole().name().equals(UserRole.ADMIN) &&
                !currentUser.getRole().name().equals(UserRole.LAB_TECHNICIAN);

        if (isRestricted) {
            if (request.getFilters() == null) request.setFilters(new ArrayList());

            request.getFilters().add(
                    new SearchFilter("user.id", currentUser.getId(), SearchFilter.Type.EQUALS)
            );
        }

        return super.search(request);
    }

    @Override
    public Solicitation save(Solicitation entity) {
        validateAccess(entity);
        if (entity.getItems() != null) {
            entity.getItems().forEach(item -> item.setSolicitation(entity));
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

    private void validateAccess(Solicitation entity) {
        if (entity.getId() == null) return;

        var dbEntity = repository.findById(entity.getId()).orElse(null);
        if (dbEntity == null) return;

        if (!Objects.equals(dbEntity.getUser().getId(), userService.getCurrentUser().getId()) && !userService.hasPrivilegedAcess()) {
            throw new AccessDeniedException("Você não tem acesso para este registro");
        }
    }
}
