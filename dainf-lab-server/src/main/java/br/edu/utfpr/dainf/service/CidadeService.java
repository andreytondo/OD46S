package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.model.Cidade;
import br.edu.utfpr.dainf.model.Estado;
import br.edu.utfpr.dainf.model.Fornecedor;
import br.edu.utfpr.dainf.repository.CidadeRepository;
import br.edu.utfpr.dainf.repository.FornecedorRepository;
import br.edu.utfpr.dainf.shared.CrudService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CidadeService extends CrudService<Long, Cidade, CidadeRepository> {
    public List<Cidade> completeByEstado(String query, Estado estado) {
        if ("".equalsIgnoreCase(query)) {
            return this.repository.findAllByEstado(estado);
        } else {
            return this.repository.findByNomeLikeIgnoreCaseAndEstado("%" + query + "%", estado);
        }
    }
}
