package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.PurchaseDTO;
import br.edu.utfpr.dainf.model.Purchase;
import br.edu.utfpr.dainf.repository.PurchaseRepository;
import br.edu.utfpr.dainf.service.PurchaseService;
import br.edu.utfpr.dainf.shared.CrudController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("purchases")
public class PurchaseController extends CrudController<Long, Purchase, PurchaseDTO, PurchaseRepository, PurchaseService> {
    public PurchaseController() {
        super(Purchase.class, PurchaseDTO.class);
    }
}
