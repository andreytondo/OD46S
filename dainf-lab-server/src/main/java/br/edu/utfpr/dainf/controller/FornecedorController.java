package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.FornecedorDTO;
import br.edu.utfpr.dainf.model.Fornecedor;
import br.edu.utfpr.dainf.repository.FornecedorRepository;
import br.edu.utfpr.dainf.service.FornecedorService;
import br.edu.utfpr.dainf.shared.CrudController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("fornecedores")
public class FornecedorController extends CrudController<Long, Fornecedor, FornecedorDTO, FornecedorRepository, FornecedorService> {
    public FornecedorController() {
        super(Fornecedor.class, FornecedorDTO.class);
    }
}
