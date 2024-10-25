package com.example.carenest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.carenest.entity.HealthCase;
import com.example.carenest.repository.HealthCaseRepository;

@RestController
@RequestMapping("/cases")
public class HealthCaseController {

    @Autowired
    private HealthCaseRepository caseRepository;

    @GetMapping
    public List<HealthCase> getAllCases() {
        return caseRepository.findAll();
    }

    @PostMapping
    public HealthCase createCase(@RequestBody HealthCase newCase) {
        return caseRepository.save(newCase);
    }

    // CRUD methods can be added as needed
}
