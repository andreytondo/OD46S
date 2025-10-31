package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.ReturnDTO;
import br.edu.utfpr.dainf.enums.UserRole;
import br.edu.utfpr.dainf.model.Return;
import br.edu.utfpr.dainf.repository.ReturnRepository;
import br.edu.utfpr.dainf.service.ReturnService;
import br.edu.utfpr.dainf.shared.CrudController;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("returns")
@RolesAllowed({UserRole.ADMIN, UserRole.LAB_TECHNICIAN})
public class ReturnController extends CrudController<Long, Return, ReturnDTO, ReturnRepository, ReturnService> {
    public ReturnController() {
        super(Return.class, ReturnDTO.class);
    }

    @GetMapping("by-loan/{loanId}")
    public ResponseEntity<Return> findByLoanId(@PathVariable Long loanId) {
        Return ret = service.findByLoanId(loanId);
        if (ret == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(ret);
    }
}
