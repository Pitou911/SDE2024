package com.example.carenest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "disease")
public class Disease {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Lob 
    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "precaution1")
    private String precaution1;

    @Column(name = "precaution2")
    private String precaution2;

    @Column(name = "precaution3")
    private String precaution3;

    @Column(name = "precaution4")
    private String precaution4;

    // Getters and Setters
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
}