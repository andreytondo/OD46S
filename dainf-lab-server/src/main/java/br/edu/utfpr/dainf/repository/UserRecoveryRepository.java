package br.edu.utfpr.dainf.repository;

import br.edu.utfpr.dainf.model.UserRecovery;
import br.edu.utfpr.dainf.shared.CrudRepository;
import br.edu.utfpr.dainf.spec.UserSpecExecutor;

import java.util.Optional;

public interface UserRecoveryRepository extends CrudRepository<Long, UserRecovery>, UserSpecExecutor {
    Optional<UserRecovery> findByResetToken(String resetToken);
}
