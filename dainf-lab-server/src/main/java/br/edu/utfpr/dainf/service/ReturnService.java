package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.model.Return;
import br.edu.utfpr.dainf.model.ReturnItem;
import br.edu.utfpr.dainf.repository.ReturnRepository;
import br.edu.utfpr.dainf.shared.CrudService;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Service;

@Service
public class ReturnService extends CrudService<Long, Return, ReturnRepository> {

    @Override
    public JpaSpecificationExecutor<Return> getSpecExecutor() {
        return repository;
    }

    @Override
    public Return save(Return entity) {
        if (entity.getItems() != null) {
            for (ReturnItem item : entity.getItems()) {
                item.setAReturn(entity);
            }
        }
        return super.save(entity);
    }

    public Return findByLoanId(Long loanId) {
        return repository.findByLoanId(loanId);
    }
}
