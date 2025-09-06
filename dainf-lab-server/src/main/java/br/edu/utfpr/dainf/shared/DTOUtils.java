package br.edu.utfpr.dainf.shared;

import lombok.Getter;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

import java.io.Serializable;

public class DTOUtils<ID extends Serializable, E extends Identifiable<ID>, D> {

    @Getter
    private final ModelMapper modelMapper;
    private final Class<E> entityClass;
    private final Class<D> dtoClass;

    public DTOUtils(Class<E> entityClass, Class<D> dtoClass) {
        this.modelMapper = new ModelMapper();
        this.modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD);
        this.entityClass = entityClass;
        this.dtoClass = dtoClass;
    }

    public D toDto(E entity) {
        return modelMapper.map(entity, dtoClass);
    }

    public E toEntity(D dto) {
        return modelMapper.map(dto, entityClass);
    }
}