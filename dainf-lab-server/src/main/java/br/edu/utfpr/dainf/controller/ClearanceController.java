package br.edu.utfpr.dainf.controller;

import br.edu.utfpr.dainf.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("clearance")
public class ClearanceController {

    private final UserService userService;

    public ClearanceController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/validate")
    public ResponseEntity<Map<String, Object>> validate(@RequestParam String code) {
        return ResponseEntity.ok(userService.validateClearance(code));
    }
}
