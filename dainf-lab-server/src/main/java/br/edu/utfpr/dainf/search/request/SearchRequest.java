package br.edu.utfpr.dainf.search.request;

import br.edu.utfpr.dainf.search.request.filter.SearchFilter;
import br.edu.utfpr.dainf.search.request.sort.SearchSort;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SearchRequest {

    @Builder.Default
    private List<SearchFilter> filters = new ArrayList<>();

    @Builder.Default
    private SearchSort sort = new SearchSort("id", SearchSort.Type.ASC);

    @Builder.Default
    private Integer page = 0;

    @Builder.Default
    private Integer rows = 50;
}