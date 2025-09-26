package br.edu.utfpr.dainf.search.request.filter;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SearchFilter {

    private String field;
    private Object value;
    private Type type;

    public enum Type {
        EQUALS, NOT_EQUALS, LIKE, ILIKE, NOT_LIKE, GREATER, LESS, GREATER_EQUALS, LESS_EQUALS, IN, NOT_IN, IS_NULL, IS_NOT_NULL, BETWEEN
    }
}