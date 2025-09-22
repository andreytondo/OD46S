package br.edu.utfpr.dainf.repository;

import br.edu.utfpr.dainf.model.Purchase;
import br.edu.utfpr.dainf.shared.CrudRepository;
import br.edu.utfpr.dainf.spec.PurchaseSpecExecutor;

public interface PurchaseRepository extends CrudRepository<Long, Purchase>, PurchaseSpecExecutor {

}
