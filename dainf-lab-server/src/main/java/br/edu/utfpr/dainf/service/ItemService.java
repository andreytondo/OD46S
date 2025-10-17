package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.model.Item;
import br.edu.utfpr.dainf.repository.ItemRepository;
import br.edu.utfpr.dainf.shared.CrudService;
import br.edu.utfpr.dainf.storage.StorageService;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class ItemService extends CrudService<Long, Item, ItemRepository> {

    private final StorageService storageService;

    public ItemService(StorageService storageService) {
        this.storageService = storageService;
    }

    @Override
    public JpaSpecificationExecutor<Item> getSpecExecutor() {
        return repository;
    }

    @Override
    public Item save(Item entity) {
        Optional.ofNullable(entity.getAssets()).ifPresent(assets ->
                assets.forEach(asset -> asset.setItem(entity))
        );

        Optional.ofNullable(entity.getImages()).ifPresent(images ->
                images.forEach(image -> image.setItem(entity))
        );

        super.save(entity);

        if (entity.getImages() != null && moveTempImages(entity)) {
            super.save(entity);
        }

        return entity;
    }

    private boolean moveTempImages(Item entity) {
        AtomicBoolean changed = new AtomicBoolean(false);

        entity.getImages().forEach(image -> {
            if (image.getName().contains("temp/")) {
                String newName = image.getName().replace("temp/", entity.getId() + "/");
                storageService.moveToPermanentFolder("item", image.getName(), newName);
                image.setName(newName);
                changed.set(true);
            }
        });

        return changed.get();
    }
}
