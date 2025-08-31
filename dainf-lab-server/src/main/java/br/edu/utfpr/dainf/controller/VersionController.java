package br.edu.utfpr.dainf.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("version")
public class VersionController {

    @RequestMapping
    public String getVersion() {
        return "1.0.0";
    }

    @RequestMapping("/info")
    public String getProtected() {
        return "1.0.0";
    }
}
