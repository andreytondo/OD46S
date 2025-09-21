package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.model.Purchase;
import br.edu.utfpr.dainf.repository.PurchaseRepository;
import br.edu.utfpr.dainf.shared.CrudService;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Service;

@Service
public class PurchaseService extends CrudService<Long, Purchase, PurchaseRepository> {

    @Override
    public JpaSpecificationExecutor<Purchase> getSpecExecutor() {
        return repository;
    }

    @Override
    public Purchase save(Purchase entity) {
        if (entity.getItems() != null) {
            entity.getItems().forEach(item -> item.setPurchase(entity));
        }
        return super.save(entity);
    }
}
