package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.model.Issue;
import br.edu.utfpr.dainf.repository.IssueRepository;
import br.edu.utfpr.dainf.shared.CrudService;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Service;

@Service
public class IssueService extends CrudService<Long, Issue, IssueRepository> {

    @Override
    public JpaSpecificationExecutor<Issue> getSpecExecutor() {
        return repository;
    }

    @Override
    public Issue save(Issue entity) {
        if (entity.getItems() != null) {
            entity.getItems().forEach(item -> item.setIssue(entity));
        }
        return super.save(entity);
    }
}
