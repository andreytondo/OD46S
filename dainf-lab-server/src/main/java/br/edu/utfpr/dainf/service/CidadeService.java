package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.model.Cidade;
import br.edu.utfpr.dainf.repository.CidadeRepository;
import br.edu.utfpr.dainf.shared.CrudService;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Service;

@Service
public class CidadeService extends CrudService<Long, Cidade, CidadeRepository> {
    @Override
    public JpaSpecificationExecutor<Cidade> getSpecExecutor() {
        return repository;
    }
}
