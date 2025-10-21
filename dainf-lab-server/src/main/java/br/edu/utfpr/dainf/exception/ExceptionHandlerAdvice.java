package br.edu.utfpr.dainf.exception;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ExceptionHandlerAdvice {

    @ExceptionHandler({ConstraintViolationException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public WarnMessage handlerSQLException(ConstraintViolationException exception, HttpServletRequest request) {
        Map<String, String> errors = new HashMap<>();
        errors.put("message", exception.getMessage());
        return new WarnMessage(HttpStatus.BAD_REQUEST.value(), "Erro ao realizar o registro no banco de dados", request.getServletPath(), errors);
    }

    @ExceptionHandler({DataIntegrityViolationException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public WarnMessage handlerSQLException(DataIntegrityViolationException exception, HttpServletRequest request) {
        return new WarnMessage(HttpStatus.BAD_REQUEST.value(), "Erro na integridade dos dados", request.getServletPath(), null);
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public WarnMessage handlerValidationException(MethodArgumentNotValidException exception, HttpServletRequest request) {
        BindingResult result = exception.getBindingResult();

        Map<String, String> validationErrors = new HashMap<>();

        for (FieldError fieldError : result.getFieldErrors()) {
            validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        return new WarnMessage(HttpStatus.BAD_REQUEST.value(), "Informações inválidas", request.getServletPath(), validationErrors);
    }

    @ExceptionHandler({WarnException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public WarnMessage handlerWarnException(WarnException exception, HttpServletRequest request) {
        Map<String, String> errors = new HashMap<>();
        errors.put("message", exception.getMessage());
        return new WarnMessage(HttpStatus.BAD_REQUEST.value(), exception.getMessage(), request.getServletPath(), errors);
    }

    @ExceptionHandler({Exception.class})
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public WarnMessage handlerException(Exception exception, HttpServletRequest request) {
        Map<String, String> errors = new HashMap<>();
        errors.put("message", exception.getMessage());
        return new WarnMessage(HttpStatus.INTERNAL_SERVER_ERROR.value(), exception.getMessage(), request.getServletPath(), errors);
    }
}