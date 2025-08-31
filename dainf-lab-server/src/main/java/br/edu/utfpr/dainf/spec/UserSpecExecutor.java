package br.edu.utfpr.dainf.spec;

import br.edu.utfpr.dainf.model.User;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface UserSpecExecutor extends JpaSpecificationExecutor<User> {
}