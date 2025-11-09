package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.ItemDTO;
import br.edu.utfpr.dainf.enums.UserRole;
import br.edu.utfpr.dainf.model.Item;
import br.edu.utfpr.dainf.repository.ItemRepository;
import br.edu.utfpr.dainf.search.request.SearchRequest;
import br.edu.utfpr.dainf.service.InventoryService;
import br.edu.utfpr.dainf.service.ItemService;
import br.edu.utfpr.dainf.shared.CrudController;
import br.edu.utfpr.dainf.storage.StorageService;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.data.web.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("items")
@RolesAllowed({UserRole.ADMIN, UserRole.LAB_TECHNICIAN})
public class ItemController extends CrudController<Long, Item, ItemDTO, ItemRepository, ItemService> {

    private final StorageService storageService;
    private final InventoryService inventoryService;

    public ItemController(StorageService storageService, InventoryService inventoryService) {
        super(Item.class, ItemDTO.class);
        this.storageService = storageService;
        this.inventoryService = inventoryService;
    }

    @Override
    @PostMapping("/search")
    @RolesAllowed({UserRole.ADMIN, UserRole.LAB_TECHNICIAN, UserRole.PROFESSOR, UserRole.STUDENT})
    public ResponseEntity<PagedModel<ItemDTO>> search(SearchRequest request) {
        return super.search(request);
    }

    @RolesAllowed({UserRole.ADMIN, UserRole.LAB_TECHNICIAN})
    @GetMapping("/storage/signed-url")
    public String getSignedUrl(@RequestParam(required = false) String objectName, @RequestParam String method) {
        return storageService.getSignedUrl("item", objectName, 3600, method);
    }

    @Override
    public ItemDTO toDto(Item entity) {
        ItemDTO dto = super.toDto(entity);
        dto.setQuantity(inventoryService.getItemQuantity(entity));
        return dto;
    }
}
