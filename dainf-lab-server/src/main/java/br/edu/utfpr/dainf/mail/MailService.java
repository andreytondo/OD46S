package br.edu.utfpr.dainf.mail;

import java.util.Map;

public interface MailService {
    void send(Mail mail);
    String buildTemplate(String templateName, Map<String, Object> variables);
}
