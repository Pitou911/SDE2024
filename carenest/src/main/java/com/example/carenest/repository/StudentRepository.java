package com.example.carenest.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.carenest.entity.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    
    // This method allows finding a student by either email or student card ID
    Optional<Student> findByEmailOrStudentCardId(String email, String studentCardId);
    Optional<Student> findByEmail(String email);
    Optional<Student> findByStudentCardId(String studentCardId);
    boolean existsByEmail(String email);
    boolean existsByStudentCardId(String studentCardId);
}
