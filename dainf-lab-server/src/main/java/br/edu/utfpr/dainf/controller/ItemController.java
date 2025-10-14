package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.ItemDTO;
import br.edu.utfpr.dainf.model.Item;
import br.edu.utfpr.dainf.repository.ItemRepository;
import br.edu.utfpr.dainf.service.InventoryService;
import br.edu.utfpr.dainf.service.ItemService;
import br.edu.utfpr.dainf.shared.CrudController;
import br.edu.utfpr.dainf.storage.StorageService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("items")
public class ItemController extends CrudController<Long, Item, ItemDTO, ItemRepository, ItemService> {

    private final StorageService storageService;
    private final InventoryService inventoryService;

    public ItemController(StorageService storageService, InventoryService inventoryService) {
        super(Item.class, ItemDTO.class);
        this.storageService = storageService;
        this.inventoryService = inventoryService;
    }

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
