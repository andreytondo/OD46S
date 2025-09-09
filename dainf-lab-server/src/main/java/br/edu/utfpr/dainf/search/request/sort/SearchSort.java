package br.edu.utfpr.dainf.search.request.sort;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SearchSort {

    private String field;
    private Type type;
    public enum Type {
        ASC, DESC
    }
}