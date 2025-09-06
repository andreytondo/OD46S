package br.edu.utfpr.dainf.shared;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedModel;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Abstract class that defines the basic operations for a controller.
 * @param <ID>
 * @param <E>
 * @param <D>
 */
public abstract class BaseController<ID extends Serializable, E  extends Identifiable<ID>, D> {

    private final DTOUtils<ID, E, D> dtoUtils;

    public BaseController(Class<E> entityClass, Class<D> dtoClass) {
        this.dtoUtils = new DTOUtils<>(entityClass, dtoClass);
        customizeMapping();
    }

    public ModelMapper getModelMapper() {
        return dtoUtils.getModelMapper();
    }

    public D toDto(E entity) {
        return dtoUtils.toDto(entity);
    }

    public E toEntity(D dto) {
        return dtoUtils.toEntity(dto);
    }

    public PagedModel<D> toPageDTO(Page<E> page, Pageable pageable) {
        List<D> dtoList = page.getContent()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
        return new PagedModel<>(new PageImpl<>(dtoList, pageable, page.getTotalElements()));
    }

    public void customizeMapping() {}
}