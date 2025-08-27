package br.edu.utfpr.dainf.repository;


import br.edu.utfpr.dainf.model.User;
import br.edu.utfpr.dainf.shared.CrudRepository;

public interface UserRepository extends CrudRepository<Long, User> {

    User findByUsername(String username);
}
