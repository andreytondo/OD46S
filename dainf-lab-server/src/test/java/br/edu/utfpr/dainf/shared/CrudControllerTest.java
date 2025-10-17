package br.edu.utfpr.dainf.shared;

import br.edu.utfpr.dainf.enums.UserRole;
import br.edu.utfpr.dainf.search.request.SearchRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ApplicationTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public abstract class CrudControllerTest<D extends Identifiable<Long>> {

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    protected abstract String getURL();

    protected abstract D createValidObject();

    protected abstract D createInvalidObject();

    protected abstract void onBeforeUpdate(D dto);

    protected RequestPostProcessor auth() {
        return SecurityMockMvcRequestPostProcessors.user("admin").roles("ADMIN");
    }

    protected ResultActions performCreate(D dto) throws Exception {
        return mockMvc.perform(post(getURL())
                .with(auth())
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJson(dto)));
    }

    protected ResultActions performUpdate(Long id, D dto) throws Exception {
        return mockMvc.perform(put(getURL() + "/" + id)
                .with(auth())
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJson(dto)));
    }

    protected ResultActions performFindOne(Long id) throws Exception {
        return mockMvc.perform(get(getURL() + "/" + id)
                .with(auth()));
    }

    protected ResultActions performDelete(Long id) throws Exception {
        return mockMvc.perform(delete(getURL() + "/" + id)
                .with(auth()));
    }

    protected ResultActions performSearch(SearchRequest request) throws Exception {
        return mockMvc.perform(post(getURL() + "/search")
                .with(auth())
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJson(request)));
    }

    // --- Helper Methods ---

    protected Long createResource() throws Exception {
        D dto = createValidObject();
        MvcResult result = performCreate(dto)
                .andExpect(status().isCreated())
                .andReturn();
        return extractId(result);
    }

    @Test
    @Order(1)
    protected void createValid() throws Exception {
        Long createdId = createResource();
        assertNotNull(createdId);
    }

    @Test
    @Order(2)
    protected void createInvalid() throws Exception {
        D dto = createInvalidObject();
        performCreate(dto).andExpect(status().isBadRequest());
    }

    @Test
    @Order(3)
    protected void updateValid() throws Exception {
        Long createdId = createResource();
        D dto = createValidObject();
        dto.setId(createdId);
        onBeforeUpdate(dto);

        performUpdate(createdId, dto).andExpect(status().isOk());
    }

    @Test
    @Order(4)
    protected void findOneValid() throws Exception {
        Long createdId = createResource();
        performFindOne(createdId).andExpect(status().isOk());
    }

    @Test
    @Order(5)
    protected void findOneNonExistent() throws Exception {
        performFindOne(999999L).andExpect(status().isNotFound());
    }

    @Test
    @Order(6)
    protected void searchEntries() throws Exception {
        createResource(); // Ensure there is at least one entry to find
        performSearch(createSearchRequest()).andExpect(status().isOk());
    }

    @Test
    @Order(99)
    protected void deleteValid() throws Exception {
        Long createdId = createResource();
        performDelete(createdId).andExpect(status().isNoContent());
    }

    protected SearchRequest createSearchRequest() {
        return new SearchRequest();
    }

    protected String asJson(Object obj) throws Exception {
        return objectMapper.writeValueAsString(obj);
    }

    protected Long extractId(MvcResult result) throws Exception {
        String content = result.getResponse().getContentAsString();
        JsonNode node = objectMapper.readTree(content);
        if (node.has("id")) {
            return node.get("id").asLong();
        }
        return node.asLong();
    }
}
