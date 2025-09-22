package br.edu.utfpr.dainf.service;

import br.edu.utfpr.dainf.model.Fornecedor;
import br.edu.utfpr.dainf.repository.FornecedorRepository;
import br.edu.utfpr.dainf.shared.CrudService;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Service;

@Service
public class FornecedorService extends CrudService<Long, Fornecedor, FornecedorRepository> {
    @Override
    public JpaSpecificationExecutor<Fornecedor> getSpecExecutor() {
        return repository;
    }
}
