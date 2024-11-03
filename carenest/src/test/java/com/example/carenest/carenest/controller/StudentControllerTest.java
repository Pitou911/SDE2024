package com.example.carenest.carenest.controller;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


import com.example.carenest.carenest.config.TestSecurityConfig;
import com.example.carenest.controller.StudentController;
import com.example.carenest.entity.Student;
import com.example.carenest.repository.StudentRepository;
import com.example.carenest.service.StudentService;
import com.fasterxml.jackson.databind.ObjectMapper;


@WebMvcTest(StudentController.class)
@Import(TestSecurityConfig.class)
public class StudentControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StudentRepository studentRepository;

    @MockBean
    private StudentService studentService;

    @MockBean
    private BCryptPasswordEncoder passwordEncoder;

    @InjectMocks
    private StudentController studentController;

    private final ObjectMapper objectMapper = new ObjectMapper();

    private Student student;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        student = new Student();
        student.setId(1L);
        student.setFirstName("John");
        student.setLastName("Doe");
        student.setEmail("john.doe@example.com");
        student.setStudentCard("12345");
        student.setPassword("encodedPassword"); // Assume encoded password
    }

    @Test
    @WithMockUser
    public void testGetStudentById() throws Exception {
        when(studentRepository.findById(1L)).thenReturn(Optional.of(student));

        mockMvc.perform(get("/api/auth/1")) // Adjust endpoint as necessary
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.firstName").value("John"));
    }

    @Test
    @WithMockUser
    public void testGetStudentById_NotFound() throws Exception {
        when(studentRepository.findById(2L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/auth/2"))
               .andExpect(status().isNotFound());
    }

    @Test
    public void testCreateStudent() throws Exception {
        String studentJson = "{\"firstName\":\"John\",\"lastName\":\"Doe\",\"email\":\"john.doe@example.com\",\"studentCard\":\"12345\",\"password\":\"encodedPassword\"}";
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(studentJson))
            .andExpect(status().isCreated());
    
    }

    @Test
    public void testCreateStudent_BadRequest() throws Exception{
        String studentJsonMissingPassword = "{\"firstName\":\"John\",\"lastName\":\"Doe\",\"email\":\"john.doe@example.com\",\"studentCard\":\"12345\"}";
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(studentJsonMissingPassword))
            .andExpect(status().isBadRequest());

    }

    @Test
    public void testCreateStudent_EmptyPassword() throws Exception{
        String studentJsonEmptyPassword = "{\"firstName\":\"John\",\"lastName\":\"Doe\",\"email\":\"john.doe@example.com\",\"studentCard\":\"12345\",\"password\":\"\"}";
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(studentJsonEmptyPassword))
            .andExpect(status().isBadRequest())  // Expecting a 400 Bad Request response
            .andExpect(jsonPath("$.error").value("Password cannot be null or empty"));

    }

    @Test
    @WithMockUser
    public void testUpdateStudent() throws Exception {
        Student updatedStudent = new Student();
        updatedStudent.setId(1L);
        updatedStudent.setFirstName("Jane");
        updatedStudent.setLastName("Doe");
        updatedStudent.setEmail("jane.doe@example.com");
        updatedStudent.setStudentCard("12345");
        updatedStudent.setPassword("encodedPassword");

        when(studentRepository.findById(1L)).thenReturn(Optional.of(student));
        when(studentRepository.save(any(Student.class))).thenReturn(updatedStudent);

        mockMvc.perform(put("/api/auth/1") // Adjust endpoint as necessary
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(updatedStudent)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.new_firstName").value("Jane"));
    }

}








