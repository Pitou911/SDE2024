package com.example.carenest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.carenest.dto.HealthCaseRequest;
import com.example.carenest.entity.HealthCase;
import com.example.carenest.service.HealthCaseService;

@RestController
@RequestMapping("/health-cases")
public class HealthCaseController {

    @Autowired
    private HealthCaseService healthCaseService;

    @PostMapping
    public ResponseEntity<HealthCase> createHealthCase(@RequestBody HealthCaseRequest request) {
        // Create a HealthCase and ensure it returns the correct type
        HealthCase healthCase = healthCaseService.createHealthCase(request);
        return ResponseEntity.ok(healthCase);
    }
}

