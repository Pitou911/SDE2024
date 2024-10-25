package com.example.carenest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.carenest.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
    // Custom query methods can go here
}