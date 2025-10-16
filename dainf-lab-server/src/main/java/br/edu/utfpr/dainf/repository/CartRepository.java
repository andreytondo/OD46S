package br.edu.utfpr.dainf.repository;

import br.edu.utfpr.dainf.model.Cart;
import br.edu.utfpr.dainf.model.User;
import br.edu.utfpr.dainf.shared.CrudRepository;
import br.edu.utfpr.dainf.spec.IssueSpecExecutor;

import java.util.Optional;

public interface CartRepository extends CrudRepository<Long, Cart>, IssueSpecExecutor {
    Optional<Cart> findByUser(User user);
}
