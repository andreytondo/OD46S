package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.enums.UserRole;
import br.edu.utfpr.dainf.model.Configuration;
import br.edu.utfpr.dainf.service.ConfigurationService;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("configuration")
@RolesAllowed({UserRole.ADMIN})
public class ConfigurationController  {

    @Autowired
    ConfigurationService configurationService;

    @GetMapping
    public Configuration getConfiguration() {
        return configurationService.get();
    }

    @PutMapping
    public Configuration saveConfiguration(@RequestBody Configuration configuration) {
        return configurationService.save(configuration);
    }
}
