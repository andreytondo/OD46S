package br.edu.utfpr.dainf.repository;

import br.edu.utfpr.dainf.model.Item;
import br.edu.utfpr.dainf.shared.CrudRepository;
import br.edu.utfpr.dainf.spec.ItemSpecExecutor;

public interface ItemRepository extends CrudRepository<Long, Item>, ItemSpecExecutor {
}
