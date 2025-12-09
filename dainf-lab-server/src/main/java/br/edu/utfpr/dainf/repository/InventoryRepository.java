package br.edu.utfpr.dainf.repository;

import br.edu.utfpr.dainf.model.Inventory;
import br.edu.utfpr.dainf.model.Item;
import br.edu.utfpr.dainf.shared.CrudRepository;
import br.edu.utfpr.dainf.dto.LowStockItemDTO;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface InventoryRepository extends CrudRepository<Long, Inventory> {
    Optional<Inventory> findByItem(Item item);

    @Query("""
            SELECT new br.edu.utfpr.dainf.dto.LowStockItemDTO(
                inv.item.id,
                inv.item.name,
                inv.quantity,
                inv.item.minimumStock,
                inv.item.category.description
            )
            FROM Inventory inv
            WHERE inv.item.minimumStock IS NOT NULL
              AND inv.quantity < inv.item.minimumStock
            ORDER BY inv.quantity ASC
            """)
    List<LowStockItemDTO> findItemsBelowMinimumStock();
}
