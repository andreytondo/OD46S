package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.UserDTO;
import br.edu.utfpr.dainf.shared.CrudControllerTest;

class UserControllerTest extends CrudControllerTest<UserDTO> {

    @Override
    protected String getURL() {
        return "/users";
    }

    @Override
    protected UserDTO createValidObject() {
        Integer random = (int) (Math.random() * 10000);
        return UserDTO.builder()
                .email(random + "teste@mail.com")
                .password("Teste123456!")
                .nome("teste")
                .documento("odfdso")
                .telefone("teste")
                .fotoUrl("teste")
                .emailVerificado(false)
                .build();
    }

    @Override
    protected UserDTO createInvalidObject() {
        return UserDTO.builder()
                .email("testecom")
                .password("teste")
                .nome("teste")
                .documento("teste")
                .telefone("teste")
                .fotoUrl("teste")
                .emailVerificado(false)
                .build();
    }

    @Override
    protected void onBeforeUpdate(UserDTO dto) {
        dto.setPassword("Teste123456!@");
    }
}