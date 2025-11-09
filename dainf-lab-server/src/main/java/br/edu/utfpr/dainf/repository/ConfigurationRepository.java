package br.edu.utfpr.dainf.repository;

import br.edu.utfpr.dainf.model.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConfigurationRepository extends JpaRepository<Configuration, Long> {
}
