package br.edu.utfpr.dainf.repository;

import br.edu.utfpr.dainf.model.Inventory;
import br.edu.utfpr.dainf.model.Item;
import br.edu.utfpr.dainf.shared.CrudRepository;

import java.util.Optional;

public interface InventoryRepository extends CrudRepository<Long, Inventory> {
    Optional<Inventory> findByItem(Item item);
}
