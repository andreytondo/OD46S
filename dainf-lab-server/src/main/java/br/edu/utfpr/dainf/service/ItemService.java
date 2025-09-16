package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.model.Item;
import br.edu.utfpr.dainf.repository.ItemRepository;
import br.edu.utfpr.dainf.shared.CrudService;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Service;

@Service
public class ItemService extends CrudService<Long, Item, ItemRepository> {

    @Override
    public JpaSpecificationExecutor<Item> getSpecExecutor() {
        return repository;
    }

    @Override
    public Item save(Item entity) {
        if (entity.getAssets() != null) {
            entity.getAssets().forEach(asset -> asset.setItem(entity));
        }
        return super.save(entity);
    }
}
