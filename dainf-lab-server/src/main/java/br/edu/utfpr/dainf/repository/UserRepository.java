package br.edu.utfpr.dainf.repository;


import br.edu.utfpr.dainf.model.User;
import br.edu.utfpr.dainf.shared.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<Long, User> {

    Optional<User> findByEmail(String email);
}
