package br.edu.utfpr.dainf.repository;

import br.edu.utfpr.dainf.model.Purchase;
import br.edu.utfpr.dainf.shared.CrudRepository;
import br.edu.utfpr.dainf.spec.PurchaseSpecExecutor;

public interface PurchaseRepository extends CrudRepository<Long, Purchase>, PurchaseSpecExecutor {
//    @Query("SELECT new br.com.utfpr.gerenciamento.server.model.dashboards.DashboardItensAdquiridos(SUM(ci.qtde), i.nome) " +
//            "FROM CompraItem ci " +
//            "LEFT JOIN Compra c " +
//            "ON c.id = ci.compra.id " +
//            "LEFT JOIN Item i " +
//            "ON i.id = ci.item.id " +
//            "WHERE c.dataCompra between :dtIni and :dtFim " +
//            "GROUP BY i.nome")
//    List<DashboardItensAdquiridos> findItensMaisAdquiridos(@Param("dtIni") LocalDate dtIni,
//                                                           @Param("dtFim") LocalDate dtFim);
    // Atualizar query pra usar nos dashboards futuramente
}
