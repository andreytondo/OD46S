package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.model.Fornecedor;
import br.edu.utfpr.dainf.model.Pais;
import br.edu.utfpr.dainf.repository.FornecedorRepository;
import br.edu.utfpr.dainf.repository.PaisRepository;
import br.edu.utfpr.dainf.shared.CrudService;
import org.springframework.stereotype.Service;

@Service
public class PaisService extends CrudService<Long, Pais, PaisRepository> {
}
