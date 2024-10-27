package com.example.carenest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.carenest.dto.HealthCaseRequest;
import com.example.carenest.entity.HealthCase;
import com.example.carenest.entity.Student;
import com.example.carenest.repository.HealthCaseRepository;
import com.example.carenest.repository.StudentRepository;

@Service
public class HealthCaseService {

    @Autowired
    private HealthCaseRepository healthCaseRepository;

    @Autowired
    private StudentRepository studentRepository; // Ensure you have this repository

    public HealthCase createHealthCase(HealthCaseRequest request) {
        // Find the student by ID
        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // Create a new HealthCase
        HealthCase healthCase = new HealthCase();
        healthCase.setDiseaseName(request.getDiseaseName());
        healthCase.setStudent(student); // Set the student relation
        healthCase.setDate(request.getDate()); 

        // Save the health case to the database and return the saved entity
        return healthCaseRepository.save(healthCase);
    }
}

