package com.example.carenest.dto;

public class StudentUpdateRequest {
    private String firstName;
    private String lastName;
    private String newPassword;
    private String currentPassword; // Add this line

    // Getters and setters
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String password) {
        this.newPassword = password;
    }

    public String getCurrentPassword() { // Add getter for currentPassword
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) { // Add setter for currentPassword
        this.currentPassword = currentPassword;
    }
}
