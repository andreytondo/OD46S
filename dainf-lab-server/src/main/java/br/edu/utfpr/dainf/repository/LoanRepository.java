package br.edu.utfpr.dainf.repository;

import br.edu.utfpr.dainf.dto.LoanCountByDay;
import br.edu.utfpr.dainf.dto.LoanStatusSummary;
import br.edu.utfpr.dainf.model.Loan;
import br.edu.utfpr.dainf.model.LoanItem;
import br.edu.utfpr.dainf.shared.CrudRepository;
import br.edu.utfpr.dainf.spec.LoanSpecExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

public interface LoanRepository extends CrudRepository<Long, Loan>, LoanSpecExecutor {
    @Query("SELECT li FROM LoanItem li " +
            "JOIN FETCH li.loan l " +
            "JOIN FETCH l.borrower " +
            "WHERE li.item.id = :itemId")
    List<LoanItem> findActiveByItem(
            @Param("itemId") Long itemId
    );

    @Query("SELECT li FROM LoanItem li " +
            "JOIN FETCH li.loan l " +
            "JOIN FETCH l.borrower " +
            "WHERE li.item.id = :itemId " +
            "ORDER BY l.loanDate DESC")
    List<LoanItem> findHistoryByItem(@Param("itemId") Long itemId);

    @Query(value = """
        SELECT
          COUNT(*) FILTER (WHERE status = 'ONGOING') AS ongoing_count,
          COUNT(*) FILTER (WHERE status = 'OVERDUE') AS overdue_count,
          COUNT(*) FILTER (WHERE status = 'COMPLETED') AS completed_count,
          COUNT(*) AS total_count
        FROM loan
        """, nativeQuery = true)
    LoanStatusSummary countByStatus();

    @Query(value = """
        SELECT CAST(loan_date AS DATE) AS day, COUNT(*) AS total
        FROM loan
        WHERE loan_date BETWEEN :startDate AND :endDate
        GROUP BY CAST(loan_date AS DATE)
        ORDER BY CAST(loan_date AS DATE)
        """, nativeQuery = true)
    List<LoanCountByDay> countLoansByDay(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );
}
