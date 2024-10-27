package com.example.carenest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.carenest.entity.HealthCase;

public interface HealthCaseRepository extends JpaRepository<HealthCase, Long> {
    List<HealthCase> findByStudentId(Long studentId);
}