package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.DashboardDTO;
import br.edu.utfpr.dainf.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDate;

@RestController
@RequestMapping("dashboard")
public class DashboardController {

    @Autowired
    DashboardService dashboardService;

    @GetMapping
    public DashboardDTO getDashboard(@RequestParam LocalDate start, @RequestParam LocalDate end) {
        return dashboardService.getDashboardData(start, end);
    }
}
