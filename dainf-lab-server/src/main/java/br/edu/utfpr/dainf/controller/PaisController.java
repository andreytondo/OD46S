package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.PaisDTO;
import br.edu.utfpr.dainf.enums.UserRole;
import br.edu.utfpr.dainf.model.Pais;
import br.edu.utfpr.dainf.repository.PaisRepository;
import br.edu.utfpr.dainf.service.PaisService;
import br.edu.utfpr.dainf.shared.CrudController;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("paises")
@RolesAllowed({UserRole.ADMIN, UserRole.LAB_TECHNICIAN})
public class PaisController extends CrudController<Long, Pais, PaisDTO, PaisRepository, PaisService> {
    public PaisController() {
        super(Pais.class, PaisDTO.class);
    }
}
