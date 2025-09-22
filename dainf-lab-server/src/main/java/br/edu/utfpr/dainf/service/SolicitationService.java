package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.model.Solicitation;
import br.edu.utfpr.dainf.repository.SolicitationRepository;
import br.edu.utfpr.dainf.shared.CrudService;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Service;

@Service
public class SolicitationService extends CrudService<Long, Solicitation, SolicitationRepository> {

    @Override
    public JpaSpecificationExecutor<Solicitation> getSpecExecutor() {
        return repository;
    }

    @Override
    public Solicitation save(Solicitation entity) {
        if (entity.getItems() != null) {
            entity.getItems().forEach(item -> item.setSolicitation(entity));
        }
        return super.save(entity);
    }
}
