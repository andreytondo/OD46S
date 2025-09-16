package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.ItemDTO;
import br.edu.utfpr.dainf.model.Item;
import br.edu.utfpr.dainf.repository.ItemRepository;
import br.edu.utfpr.dainf.service.ItemService;
import br.edu.utfpr.dainf.shared.CrudController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("items")
public class ItemController extends CrudController<Long, Item, ItemDTO, ItemRepository, ItemService> {
    public ItemController() {
        super(Item.class, ItemDTO.class);
    }
}
