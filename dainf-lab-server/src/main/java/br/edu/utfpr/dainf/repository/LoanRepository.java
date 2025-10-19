package br.edu.utfpr.dainf.repository;

import br.edu.utfpr.dainf.enums.LoanStatus;
import br.edu.utfpr.dainf.model.Loan;
import br.edu.utfpr.dainf.model.LoanItem;
import br.edu.utfpr.dainf.shared.CrudRepository;
import br.edu.utfpr.dainf.spec.LoanSpecExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface LoanRepository extends CrudRepository<Long, Loan>, LoanSpecExecutor {
    @Query("SELECT li FROM LoanItem li " +
            "JOIN FETCH li.loan l " +
            "JOIN FETCH l.borrower " +
            "WHERE li.item.id = :itemId AND li.status IN :statuses")
    List<LoanItem> findActiveByItem(
            @Param("itemId") Long itemId,
            @Param("statuses") Collection<LoanStatus> statuses
    );

    @Query("SELECT li FROM LoanItem li " +
            "JOIN FETCH li.loan l " +
            "JOIN FETCH l.borrower " +
            "WHERE li.item.id = :itemId " +
            "ORDER BY l.loanDate DESC")
    List<LoanItem> findHistoryByItem(@Param("itemId") Long itemId);
}
