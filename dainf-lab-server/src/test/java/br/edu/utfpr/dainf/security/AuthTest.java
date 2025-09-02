package br.edu.utfpr.dainf.security;

import br.edu.utfpr.dainf.model.User;
import br.edu.utfpr.dainf.service.UserService;
import br.edu.utfpr.dainf.shared.ApplicationTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ApplicationTest
@AutoConfigureMockMvc
public class AuthTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserService userService;

    @Test
    public void loginComCredenciaisCorretas() throws Exception {
        createUser();
        String json = """
            {
                "email": "admin@utfpr.edu.br",
                "password": "Teste123456!"
            }
            """;

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk());
    }

    @Test
    public void loginComCredenciaisErradas() throws Exception {
        String json = """
            {
                "email": "admin@utfpr.edu.br",
                "password": "senhaErrada"
            }
            """;
        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "admin@utfpr.edu.br")
    public void acessarEndpointProtegidoComMockUser() throws Exception {
        mockMvc.perform(get("/version/info"))
                .andExpect(status().isOk());
    }

    @Test
    public void acessarEndpointPublicoSemToken() throws Exception {
        mockMvc.perform(post("/version"))
                .andExpect(status().isOk());
    }

    private void createUser() {
        userService.save(new User(
                null,
                "admin@utfpr.edu.br",
                "Teste123456!",
                "Teste",
                "2562529",
                "5546988358080",
                "teste",
                true
        ));
    }
}