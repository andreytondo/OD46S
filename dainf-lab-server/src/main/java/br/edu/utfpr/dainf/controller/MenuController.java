package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.dto.MenuDTO;
import br.edu.utfpr.dainf.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("menu")
public class MenuController {

    @Autowired
    MenuService menuService;

    @GetMapping
    public MenuDTO getMenu() {
        return menuService.getMenu();
    }
}
