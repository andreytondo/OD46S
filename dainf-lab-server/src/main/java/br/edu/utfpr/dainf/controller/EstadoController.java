package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.EstadoDTO;
import br.edu.utfpr.dainf.dto.FornecedorDTO;
import br.edu.utfpr.dainf.dto.UserDTO;
import br.edu.utfpr.dainf.model.Estado;
import br.edu.utfpr.dainf.model.Fornecedor;
import br.edu.utfpr.dainf.model.User;
import br.edu.utfpr.dainf.repository.EstadoRepository;
import br.edu.utfpr.dainf.repository.FornecedorRepository;
import br.edu.utfpr.dainf.service.EstadoService;
import br.edu.utfpr.dainf.service.FornecedorService;
import br.edu.utfpr.dainf.shared.CrudController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("estados")
public class EstadoController extends CrudController<Long, Estado, EstadoDTO, EstadoRepository, EstadoService> {
    public EstadoController() {
        super(Estado.class, EstadoDTO.class);
    }
}
