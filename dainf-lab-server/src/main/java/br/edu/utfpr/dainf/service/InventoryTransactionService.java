package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.model.InventoryTransaction;
import br.edu.utfpr.dainf.repository.InventoryTransactionRepository;
import br.edu.utfpr.dainf.shared.CrudService;
import org.springframework.stereotype.Service;

@Service
public class InventoryTransactionService extends CrudService<Long, InventoryTransaction, InventoryTransactionRepository> {
}
