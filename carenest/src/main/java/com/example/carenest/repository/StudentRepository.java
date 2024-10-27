package com.example.carenest.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.carenest.entity.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    
    // This method allows finding a student by either email or student card ID
    Optional<Student> findByEmailOrStudentCard(String email, String studentCard);
    Optional<Student> findByEmail(String email);
    Optional<Student> findByStudentCard(String studentCard);
    boolean existsByEmail(String email);
    boolean existsByStudentCard(String studentCard);
}
