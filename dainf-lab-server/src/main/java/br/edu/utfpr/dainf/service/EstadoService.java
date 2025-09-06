package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.model.Estado;
import br.edu.utfpr.dainf.model.Fornecedor;
import br.edu.utfpr.dainf.repository.EstadoRepository;
import br.edu.utfpr.dainf.repository.FornecedorRepository;
import br.edu.utfpr.dainf.shared.CrudService;
import org.springframework.stereotype.Service;

@Service
public class EstadoService extends CrudService<Long, Estado, EstadoRepository> {
}
