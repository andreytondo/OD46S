package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.model.ItemImage;
import br.edu.utfpr.dainf.repository.ItemImageRepository;
import br.edu.utfpr.dainf.shared.CrudService;
import org.springframework.stereotype.Service;

@Service
public class ItemImageService extends CrudService<Long, ItemImage, ItemImageRepository> {

}
