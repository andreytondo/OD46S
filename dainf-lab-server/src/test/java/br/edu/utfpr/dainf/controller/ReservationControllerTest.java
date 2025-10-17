package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.ReservationDTO;
import br.edu.utfpr.dainf.shared.CrudControllerTest;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import java.time.Instant;
import java.util.List;

class ReservationControllerTest extends CrudControllerTest<ReservationDTO> {
    @BeforeEach
    protected void setUp() {
    }

    @Override
    protected String getURL() {
        return "/reservations";
    }

    @Override
    protected ReservationDTO createValidObject() {
        return ReservationDTO.builder()
                .reservationDate(Instant.now())
                .withdrawalDate(Instant.now())
                .description("Teste")
                .observation("Teste")
                .items(List.of())
                .build();
    }

    @Override
    protected ReservationDTO createInvalidObject() {
        return new ReservationDTO();
    }

    @Override
    protected void onBeforeUpdate(ReservationDTO dto) {
        dto.setDescription("Teste update");
    }
}
