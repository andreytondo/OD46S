package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.SolicitationDTO;
import br.edu.utfpr.dainf.enums.UserRole;
import br.edu.utfpr.dainf.model.Solicitation;
import br.edu.utfpr.dainf.repository.SolicitationRepository;
import br.edu.utfpr.dainf.service.SolicitationService;
import br.edu.utfpr.dainf.shared.CrudController;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("solicitations")
@RolesAllowed({UserRole.ADMIN, UserRole.LAB_TECHNICIAN})
public class SolicitationController extends CrudController<Long, Solicitation, SolicitationDTO, SolicitationRepository, SolicitationService> {
    public SolicitationController() {
        super(Solicitation.class, SolicitationDTO.class);
    }
}
