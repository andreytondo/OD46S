package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.UserDTO;
import br.edu.utfpr.dainf.shared.CrudControllerTest;
import org.junit.jupiter.api.Assertions;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

class UserControllerTest extends CrudControllerTest<UserDTO> {

    @Override
    protected String getURL() {
        return "/users";
    }

    @Override
    protected UserDTO createValidObject() {
        // $2a$10$Y5yHBoZR.Ym/qYI/NoHjn.n7Ne3puvDYMcpTYC2yBH2MoEz39Fau6
        return new UserDTO(
                null,
                "teste@mail.com",
                "Teste123456!",
                null,
                null,
                null,
                null,
                false
        );
    }

    @Override
    protected UserDTO createInvalidObject() {
        return new UserDTO(
                null,
                "teste",
                "123",
                null,
                null,
                null,
                null,
                false
        );
    }

    @Override
    protected void onBeforeUpdate(UserDTO dto) {
        dto.setId(1L);
        dto.setPassword("Teste123456!@");
    }

    @Override
    protected void searchEntries() {
        Assertions.assertThrows(NullPointerException.class, super::searchEntries);
    }

    @Override
    protected RequestPostProcessor auth() {
        return SecurityMockMvcRequestPostProcessors.user("usuario1").roles("USER");
    }
}