package com.example.carenest.dto;

public class HealthCaseRequest {
    
    private String diseaseName;
    private Long studentId; // This should be the ID of the student (e.g., 1)
    private String date;

    // Getters and Setters
    public String getDiseaseName() {
        return diseaseName;
    }

    public void setDiseaseName(String diseaseName) {
        this.diseaseName = diseaseName;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }
    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}

