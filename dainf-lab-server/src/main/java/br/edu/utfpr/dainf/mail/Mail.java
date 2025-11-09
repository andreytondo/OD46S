package br.edu.utfpr.dainf.mail;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter @Setter
public class Mail {
    private List<String> to;
    private String subject;
    private String content;
}
