package br.edu.utfpr.dainf.repository;

import br.edu.utfpr.dainf.model.Issue;
import br.edu.utfpr.dainf.shared.CrudRepository;
import br.edu.utfpr.dainf.spec.IssueSpecExecutor;

public interface IssueRepository extends CrudRepository<Long, Issue>, IssueSpecExecutor {

}
