package br.edu.utfpr.dainf.model;

import br.edu.utfpr.dainf.shared.Identifiable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.proxy.HibernateProxy;
import org.hibernate.validator.constraints.br.CNPJ;

import java.util.Objects;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "fornecedor")
public class Fornecedor implements Identifiable<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotEmpty(message = "O campo 'Razão Social' é de preenchimento obrigatório.")
    @Column(name = "razao_social", length = 80, nullable = false)
    private String razaoSocial;

    @NotEmpty(message = "O campo 'Nome Fantasia' é de preenchimento obrigatório.")
    @Column(name = "nome_fantasia", length = 80, nullable = false)
    private String nomeFantasia;

    @NotEmpty(message = "O campo 'CNPJ' é de preenchimento obrigatório.")
    @CNPJ
    @Column(name = "cnpj", length = 14, nullable = false)
    private String cnpj;

    @NotEmpty(message = "O campo 'Inscrição Estadual' é de preenchimento obrigatório.")
    @Column(name = "ie", length = 14, nullable = false)
    private String ie;

    @NotEmpty(message = "O campo 'Endereco' é de preenchimento obrigatório.")
    @Column(name = "endereco", length = 100)
    private String endereco;

    @Column(name = "observacao", length = 2000)
    private String observacao;

    @NotEmpty(message = "O campo 'Email' é de preenchimento obrigatório.")
    @Column(name = "email")
    private String email;

    @NotEmpty(message = "O campo 'Telefone' é de preenchimento obrigatório.")
    @Column(name = "telefone", length = 15)
    private String telefone;

    @NotNull(message = "O campo 'Cidade' deve ser selecionado.")
    @ManyToOne
    @JoinColumn(name = "cidade_id", referencedColumnName = "id")
    private Cidade cidade;

    @NotNull(message = "O campo 'Estado' deve ser selecionado.")
    @ManyToOne
    @JoinColumn(name = "estado_id", referencedColumnName = "id")
    private Estado estado;
}