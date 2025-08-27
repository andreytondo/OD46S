package br.edu.utfpr.dainf.exception;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Map;

@Data
@NoArgsConstructor
public class WarnMessage {

    private long timestamp = new Date().getTime();
    private int status;
    private String message;
    private String url;
    private Map<String, String> errors;

    public WarnMessage(int status, String message, String url, Map<String, String> errors) {
        this.status = status;
        this.message = message;
        this.url = url;
        this.errors = errors;
    }
}