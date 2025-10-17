package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.LoanDTO;
import br.edu.utfpr.dainf.dto.LoanItemTrackingDTO;
import br.edu.utfpr.dainf.enums.UserRole;
import br.edu.utfpr.dainf.model.Loan;
import br.edu.utfpr.dainf.model.LoanItem;
import br.edu.utfpr.dainf.repository.LoanRepository;
import br.edu.utfpr.dainf.service.LoanService;
import br.edu.utfpr.dainf.shared.CrudController;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("loans")
@RolesAllowed({UserRole.ADMIN, UserRole.LAB_TECHNICIAN})
public class LoanController extends CrudController<Long, Loan, LoanDTO, LoanRepository, LoanService> {
    public LoanController() {
        super(Loan.class, LoanDTO.class);
    }

    @GetMapping("/item/{itemId}/active")
    public ResponseEntity<List<LoanItemTrackingDTO>> getActiveLoansForItem(@PathVariable Long itemId) {

        List<LoanItem> activeLoans = service.getActiveLoansForItem(itemId);

        List<LoanItemTrackingDTO> dtos = activeLoans.stream()
                .map(LoanItemTrackingDTO::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/item/{itemId}/history")
    public ResponseEntity<List<LoanItemTrackingDTO>> getLoanHistoryForItem(@PathVariable Long itemId) {

        List<LoanItem> history = service.getHistoryForItem(itemId);

        List<LoanItemTrackingDTO> dtos = history.stream()
                .map(LoanItemTrackingDTO::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }
}
