package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.LoanDTO;
import br.edu.utfpr.dainf.enums.UserRole;
import br.edu.utfpr.dainf.model.Loan;
import br.edu.utfpr.dainf.repository.LoanRepository;
import br.edu.utfpr.dainf.service.LoanService;
import br.edu.utfpr.dainf.shared.CrudController;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("loans")
@RolesAllowed({UserRole.ADMIN, UserRole.LAB_TECHNICIAN})
public class LoanController extends CrudController<Long, Loan, LoanDTO, LoanRepository, LoanService> {
    public LoanController() {
        super(Loan.class, LoanDTO.class);
    }
}
