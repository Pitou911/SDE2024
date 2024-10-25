package com.example.carenest.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

@Entity
public class Disease {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    private String precaution1;
    private String precaution2;
    private String precaution3;
    private String precaution4;

    @ManyToMany(mappedBy = "disease")
    private List<HealthCase> cases = new ArrayList<>();

    // Getters, setters, and constructors
    // Default constructor
    public Disease() {}

    // Parameterized constructor
    public Disease(String name, String description, String precaution1, String precaution2, String precaution3, String precaution4) {
        this.name = name;
        this.description = description;
        this.precaution1 = precaution1;
        this.precaution2 = precaution2;
        this.precaution3 = precaution3;
        this.precaution4 = precaution4;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPrecaution1() {
        return precaution1;
    }

    public void setPrecaution1(String precaution1) {
        this.precaution1 = precaution1;
    }

    public String getPrecaution2() {
        return precaution2;
    }

    public void setPrecaution2(String precaution2) {
        this.precaution2 = precaution2;
    }

    public String getPrecaution3() {
        return precaution3;
    }

    public void setPrecaution3(String precaution3) {
        this.precaution3 = precaution3;
    }

    public String getPrecaution4() {
        return precaution4;
    }

    public void setPrecaution4(String precaution4) {
        this.precaution4 = precaution4;
    }

    public List<HealthCase> getHealthCases() {
        return cases;
    }

    public void setHealthCases(List<HealthCase> cases) {
        this.cases = cases;
    }
}
