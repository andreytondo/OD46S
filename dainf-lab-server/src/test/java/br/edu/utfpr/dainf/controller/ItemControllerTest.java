package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.AssetDTO;
import br.edu.utfpr.dainf.dto.CategoryDTO;
import br.edu.utfpr.dainf.dto.ItemDTO;
import br.edu.utfpr.dainf.shared.CrudControllerTest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.TestInstance;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import java.math.BigDecimal;
import java.util.List;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class ItemControllerTest extends CrudControllerTest<ItemDTO> {

    @Override
    protected String getURL() {
        return "/items";
    }

    @Override
    protected ItemDTO createValidObject() {
        AssetDTO asset1 = createAsset("asset1");
        AssetDTO asset2 = createAsset("asset2");
        return new ItemDTO(null, "Teste", "description", BigDecimal.TEN, null, List.of(asset1, asset2));
    }

    @Override
    protected ItemDTO createInvalidObject() {
        return new ItemDTO();
    }

    @Override
    protected void onBeforeUpdate(ItemDTO dto) {
        dto.setId(1L);
    }

    @Override
    protected void searchEntries() {
        Assertions.assertThrows(NullPointerException.class, super::searchEntries);
    }

    @Override
    protected RequestPostProcessor auth() {
        return SecurityMockMvcRequestPostProcessors.user("usuario1").roles("USER");
    }

    private AssetDTO createAsset(String identifier) {
        AssetDTO asset = new AssetDTO();
        asset.setIdentifier(identifier);
        return asset;
    }
}