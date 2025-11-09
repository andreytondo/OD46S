package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.model.Configuration;
import br.edu.utfpr.dainf.repository.ConfigurationRepository;
import org.springframework.stereotype.Service;

@Service
public class ConfigurationService {

    private final ConfigurationRepository configurationRepository;

    public ConfigurationService(ConfigurationRepository configurationRepository) {
        this.configurationRepository = configurationRepository;
    }

    public Configuration get() {
        return configurationRepository.findAll().stream().findFirst().orElse(new Configuration());
    }

    public Configuration save(Configuration configuration) {
        Configuration saved = get();
        configuration.setId(saved.getId());
        return configurationRepository.save(configuration);
    }
}
