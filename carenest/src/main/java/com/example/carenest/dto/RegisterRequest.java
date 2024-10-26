package com.example.carenest.dto;

import javax.validation.constraints.NotBlank;

public class RegisterRequest {

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    private String studentId;

    @NotBlank
    private String email;

    @NotBlank
    private String password;

    // Getters and setters
    public RegisterRequest(){
    }

    public RegisterRequest(String firstname, String lastname, String studentId, String email, String password){
        this.firstName = firstname;
        this.lastName = lastname;
        this.studentId = studentId;
        this.email = email;
        this.password = password;
    }

    public String getFirstName(){
        return firstName;
    }
    public void setFirstName(String firstName){
        this.firstName = firstName;
    }
    public String getLastName(){
        return lastName;
    }
    public void setLastName(String lastName){
        this.lastName = lastName;
    }
    public String getStudentId(){
        return studentId;
    }
    public void setStudentId(String studentId){
        this.studentId = studentId;
    }
    public String getEmail(){
        return email;
    }
    public void setEmail(String email){
        this.email = email;
    }
    public String getPassword(){
        return password;
    }
    public void setPassword(String password){
        this.password = password;
    }
}