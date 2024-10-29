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
    public Optional<Student> findByEmailOrStudentCard(String identifier) {
        return studentRepository.findByEmailOrStudentCard(identifier, identifier);
    }
}
