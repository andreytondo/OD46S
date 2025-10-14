package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.enums.InventoryTransactionType;
import br.edu.utfpr.dainf.model.Purchase;
import br.edu.utfpr.dainf.model.PurchaseItem;
import br.edu.utfpr.dainf.repository.PurchaseRepository;
import br.edu.utfpr.dainf.shared.CrudService;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Service;

@Service
public class PurchaseService extends CrudService<Long, Purchase, PurchaseRepository> {

    private final InventoryService inventoryService;

    public PurchaseService(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @Override
    public JpaSpecificationExecutor<Purchase> getSpecExecutor() {
        return repository;
    }

    @Override
    public Purchase save(Purchase entity) {
        if (entity.getItems() != null) {
            for (PurchaseItem item : entity.getItems()) {
                item.setPurchase(entity);
                inventoryService.handleTransaction(item.getItem(), item.getQuantity(), InventoryTransactionType.PURCHASE);
            }
        }
        return super.save(entity);
    }
}
