package com.example.carenest.dto;

public class HealthCaseResponse {
    private Long id;
    private String diseaseName;
    private String date;
    private String diseaseDescription;
    private String precaution1;
    private String precaution2;
    private String precaution3;
    private String precaution4;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDiseaseName() {
        return diseaseName;
    }

    public void setDiseaseName(String diseaseName) {
        this.diseaseName = diseaseName;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDiseaseDescription() {
        return diseaseDescription;
    }

    public void setDiseaseDescription(String diseaseDescription) {
        this.diseaseDescription = diseaseDescription;
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
