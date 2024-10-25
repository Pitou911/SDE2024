package com.example.carenest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.carenest.entity.Disease;

public interface DiseaseRepository extends JpaRepository<Disease, Long> {
    // Custom query methods can go here
}
