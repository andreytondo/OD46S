package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.CidadeDTO;
import br.edu.utfpr.dainf.enums.UserRole;
import br.edu.utfpr.dainf.model.Cidade;
import br.edu.utfpr.dainf.repository.CidadeRepository;
import br.edu.utfpr.dainf.service.CidadeService;
import br.edu.utfpr.dainf.shared.CrudController;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("cidades")
@RolesAllowed({UserRole.ADMIN, UserRole.LAB_TECHNICIAN})
public class CidadeController extends CrudController<Long, Cidade, CidadeDTO, CidadeRepository, CidadeService> {
    public CidadeController() {
        super(Cidade.class, CidadeDTO.class);
    }
}
