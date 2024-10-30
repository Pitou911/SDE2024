package com.example.carenest.dto;

import javax.validation.constraints.NotBlank;

public class RegisterRequest {

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    private String studentCard;

    @NotBlank(message= "Email cannot be null or empty")
    private String email;

    @NotBlank(message= "Password cannot be null or empty")
    private String password;

    public RegisterRequest(){
    }

    public RegisterRequest(String firstname, String lastname, String studentCard, String email, String password){
        this.firstName = firstname;
        this.lastName = lastname;
        this.studentCard = studentCard;
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
    public String getStudentCard(){
        return studentCard;
    }
    public void setStudentCard(String studentCard){
        this.studentCard = studentCard;
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
