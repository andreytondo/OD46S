package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.IssueDTO;
import br.edu.utfpr.dainf.model.Issue;
import br.edu.utfpr.dainf.repository.IssueRepository;
import br.edu.utfpr.dainf.service.IssueService;
import br.edu.utfpr.dainf.shared.CrudController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("issues")
public class IssueController extends CrudController<Long, Issue, IssueDTO, IssueRepository, IssueService> {
    public IssueController() {
        super(Issue.class, IssueDTO.class);
    }
}
