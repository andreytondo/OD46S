package br.edu.utfpr.dainf.search.request.sort;

import org.springframework.data.domain.Sort;

public class SearchSortAdapter {

    public static Sort adapt(SearchSort sort) {
        if (sort == null) {
            return defaultSort();
        }
        return byType(sort.getType(), sort.getField());
    }

    /**
     * Provides a default sort method. Curretly unsorted.
     * Could provide a default sort by id if needed.
     *
     * @return Sort object - unsorted
     */
    public static Sort defaultSort() {
        return Sort.by(Sort.Order.asc("id"));
    }

    public static Sort byType(SearchSort.Type type, String field) {
        return switch (type) {
            case ASC -> Sort.by(Sort.Order.asc(field));
            case DESC -> Sort.by(Sort.Order.desc(field));
        };
    }
}