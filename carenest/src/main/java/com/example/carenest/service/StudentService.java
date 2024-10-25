package com.example.carenest.service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.carenest.entity.Student;
import com.example.carenest.repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // Method to check if a student exists by email or student ID
    public Optional<Student> findByEmailOrStudentCardId(String identifier) {
        // You can call your repository method here with a placeholder for the student card ID
        return studentRepository.findByEmailOrStudentCardId(identifier, identifier);
    }
}
