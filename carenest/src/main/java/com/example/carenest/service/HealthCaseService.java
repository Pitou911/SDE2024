package com.example.carenest.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.carenest.dto.HealthCaseRequest;
import com.example.carenest.dto.HealthCaseResponse;
import com.example.carenest.entity.Disease;
import com.example.carenest.entity.HealthCase;
import com.example.carenest.entity.Student;
import com.example.carenest.repository.DiseaseRepository;
import com.example.carenest.repository.HealthCaseRepository;
import com.example.carenest.repository.StudentRepository;

@Service
public class HealthCaseService {

    @Autowired
    private HealthCaseRepository healthCaseRepository;

    @Autowired
    private StudentRepository studentRepository; 

    @Autowired
    private DiseaseRepository diseaseRepository;

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

    public List<HealthCaseResponse> getCasesByStudentId(Long studentId){
        // return healthCaseRepository.findByStudentId(studentId);
        List<HealthCase> cases = healthCaseRepository.findByStudentId(studentId);
        List<HealthCaseResponse> responseList = new ArrayList<>();

        for (HealthCase healthCase : cases) {
            HealthCaseResponse response = new HealthCaseResponse();
            response.setId(healthCase.getId());
            response.setDiseaseName(healthCase.getDiseaseName());
            response.setDate(healthCase.getDate());

            // Fetch the corresponding Disease details
            Disease disease = diseaseRepository.findByName(healthCase.getDiseaseName());
            if (disease != null) {
                response.setDiseaseDescription(disease.getDescription());
                response.setPrecaution1(disease.getPrecaution1());
                response.setPrecaution2(disease.getPrecaution2());
                response.setPrecaution3(disease.getPrecaution3());
                response.setPrecaution4(disease.getPrecaution4());
            }

            responseList.add(response);
        }

        return responseList;
    
    }
}

