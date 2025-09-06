package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.CidadeDTO;
import br.edu.utfpr.dainf.dto.UserDTO;
import br.edu.utfpr.dainf.model.Cidade;
import br.edu.utfpr.dainf.model.User;
import br.edu.utfpr.dainf.repository.CidadeRepository;
import br.edu.utfpr.dainf.service.CidadeService;
import br.edu.utfpr.dainf.shared.CrudController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("cidades")
public class CidadeController extends CrudController<Long, Cidade, CidadeDTO, CidadeRepository, CidadeService> {
    public CidadeController() {
        super(Cidade.class, CidadeDTO.class);
    }
}
