package com.example.carenest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.carenest.entity.HealthCase;

public interface HealthCaseRepository extends JpaRepository<HealthCase, Long> {
    // Custom query methods can go here
}