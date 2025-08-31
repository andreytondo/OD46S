package br.edu.utfpr.dainf.shared;

import br.edu.utfpr.dainf.search.request.SearchRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.*;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ApplicationTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public abstract class CrudControllerTest<D extends Identifiable<Long>> {

    @Autowired
    protected MockMvc mockMvc;

    protected Long lastCreatedId;

    protected abstract String getURL();
    protected abstract D createValidObject();
    protected abstract D createInvalidObject();
    protected abstract void onBeforeUpdate(D dto);
    protected abstract RequestPostProcessor auth();

    @Test
    @Order(1)
    protected void createValid() throws Exception {
        D dto = createValidObject();
        MvcResult result = mockMvc.perform(post(getURL())
                        .with(auth())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJson(dto)))
                .andExpect(status().isCreated())
                .andReturn();

        lastCreatedId = extractId(result);
        assertNotNull(lastCreatedId);
    }

    @Test
    @Order(2)
    protected void createInvalid() throws Exception {
        D dto = createInvalidObject();
        mockMvc.perform(post(getURL())
                        .with(auth())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJson(dto)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @Order(3)
    protected void updateValid() throws Exception {
        D dto = createValidObject();
        onBeforeUpdate(dto);

        mockMvc.perform(put(getURL() + "/" + dto.getId())
                        .with(auth())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJson(dto)))
                .andExpect(status().isOk());
    }

    @Test
    @Order(4)
    protected void findOneValid() throws Exception {
        mockMvc.perform(get(getURL() + "/" + 1)
                        .with(auth()))
                .andExpect(status().isOk());
    }

    @Test
    @Order(5)
    protected void findOneNonExistent() throws Exception {
        mockMvc.perform(get(getURL() + "/999999")
                        .with(auth()))
                .andExpect(status().isNotFound());
    }

    @Test
    @Order(6)
    protected void searchEntries() throws Exception {
        mockMvc.perform(post(getURL() + "/search")
                        .with(auth())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJson(createSearchRequest())))
                .andExpect(status().isOk());
    }

    @Test
    @Order(99)
    protected void deleteValid() throws Exception {
        mockMvc.perform(delete(getURL() + "/" + 1)
                        .with(auth()))
                .andExpect(status().isNoContent());
    }

    protected SearchRequest createSearchRequest() {
        return new SearchRequest();
    }

    protected String asJson(Object obj) throws Exception {
        return new ObjectMapper().writeValueAsString(obj);
    }

    protected Long extractId(MvcResult result) throws Exception {
        String content = result.getResponse().getContentAsString();
        JsonNode node = new ObjectMapper().readTree(content);
        return node.asLong();
    }
}
