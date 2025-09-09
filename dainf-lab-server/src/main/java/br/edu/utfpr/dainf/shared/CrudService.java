package br.edu.utfpr.dainf.shared;

import br.edu.utfpr.dainf.search.SearchHandler;
import br.edu.utfpr.dainf.search.request.SearchRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.io.Serializable;
import java.util.Optional;

public abstract class CrudService<ID extends Serializable, E extends Identifiable<ID>, R extends CrudRepository<ID, E>> {

    @Autowired
    protected R repository;

    public E save(E entity) {
        return repository.save(entity);
    }

    public Optional<E> findById(ID id) {
        return repository.findById(id);
    }

    public void deleteById(ID id) {
        repository.deleteById(id);
    }

    public JpaSpecificationExecutor<E> getSpecExecutor() {
        return null;
    }

    public Page<E> search(SearchRequest request) {
        return new SearchHandler<>(getSpecExecutor()).handle(request);
    }
}
