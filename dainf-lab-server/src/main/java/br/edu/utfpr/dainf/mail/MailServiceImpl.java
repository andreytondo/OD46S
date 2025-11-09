package br.edu.utfpr.dainf.mail;

import br.edu.utfpr.dainf.exception.MailException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.UnsupportedEncodingException;
import java.util.Map;

@Service
public class MailServiceImpl implements MailService {

    @Value("${spring.mail.username}")
    private String username;


    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;

    public MailServiceImpl(JavaMailSender javaMailSender, TemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    @Override
    public void send(Mail mail) {
        try {
            MimeMessage message = buildMessage(mail);
            javaMailSender.send(message);
        } catch (Exception e) {
            throw new MailException("Falha ao enviar e-mail", e);
        }
    }

    @Override
    public String buildTemplate(String templateName, Map<String, Object> variables) {
        Context context = new Context();
        context.setVariables(variables);
        return templateEngine.process(templateName, context);
    }

    private MimeMessage buildMessage(Mail mail) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setFrom(username, "Laboratório de Informática - UTFPR/PB");
        helper.setReplyTo(username);
        helper.setTo(mail.getTo().toArray(new String[0]));
        helper.setSubject(mail.getSubject());
        helper.setText(mail.getContent(), true);

        return message;
    }
}
