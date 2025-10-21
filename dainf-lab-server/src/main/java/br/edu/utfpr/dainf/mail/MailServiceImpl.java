package br.edu.utfpr.dainf.mail;

import br.edu.utfpr.dainf.exception.MailException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
public class MailServiceImpl implements MailService {

    private final JavaMailSender javaMailSender;

    public MailServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Override
    public void send(Mail mail) {
        try {
            MimeMessage message = buildMessage(mail);
            javaMailSender.send(message);
        } catch (Exception e) {
            throw new MailException("Falha ao enviar e-mail");
        }
    }

    private MimeMessage buildMessage(Mail mail) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setFrom(mail.getFrom(), "Laboratório de Informática - UTFPR/PB");
        helper.setReplyTo(mail.getFrom());

        helper.setSubject(mail.getSubject());
        helper.setText(mail.getContent(), true);

        return message;
    }
}
