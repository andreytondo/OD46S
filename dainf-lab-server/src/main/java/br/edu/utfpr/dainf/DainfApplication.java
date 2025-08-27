package br.edu.utfpr.dainf;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(value = {"br.edu.utfpr.dainf.repository", "br.edu.utfpr.dainf.spec"})
@EntityScan("br.edu.utfpr.dainf.model")
public class DainfApplication {

	public static void main(String[] args) {
		SpringApplication.run(DainfApplication.class, args);
	}

}