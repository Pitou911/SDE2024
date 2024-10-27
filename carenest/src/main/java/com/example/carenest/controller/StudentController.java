package com.example.carenest.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.carenest.dto.LoginRequest;
import com.example.carenest.dto.RegisterRequest;
import com.example.carenest.entity.Student;
import com.example.carenest.repository.StudentRepository;
import com.example.carenest.service.StudentService;

@RestController
@RequestMapping("/api/auth")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentService studentService; 

    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Optional<Student> student = studentRepository.findById(id);
        return student.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student updatedStudent) {
        Optional<Student> optionalStudent = studentRepository.findById(id);
        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            student.setFirstName(updatedStudent.getFirstName());
            student.setLastName(updatedStudent.getLastName());
            Student savedStudent = studentRepository.save(student);
            return ResponseEntity.ok(savedStudent);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        if (studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String,String>> login(@RequestBody LoginRequest loginRequest) {
        Optional<Student> student = studentService.findByEmailOrStudentCard(loginRequest.getIdentifier());

        if (student.isPresent()) {
            // Initialize the password encoder
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            
            // Check if the provided password matches the hashed password in the database
            if (passwordEncoder.matches(loginRequest.getPassword(), student.get().getPassword())) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Login successful");
                response.put("student_id", student.get().getId().toString());
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(401).body(Map.of("error", "Invalid password"));
            }
        } else {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Student> registerStudent(@RequestBody RegisterRequest registerRequest) {
        // Check if the email or student ID already exists
        if (studentRepository.existsByEmail(registerRequest.getEmail()) ||
            studentRepository.existsByStudentCard(registerRequest.getStudentCard())) {
            return ResponseEntity.badRequest().body(null); // You can return a meaningful error response
        }

        // Create a new Student entity
        Student student = new Student();
        student.setFirstName(registerRequest.getFirstName());
        student.setLastName(registerRequest.getLastName());
        student.setStudentCard(registerRequest.getStudentCard());
        student.setEmail(registerRequest.getEmail());
        
        // Encrypt the Password
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        student.setPassword(passwordEncoder.encode(registerRequest.getPassword())); // You may want to hash the password before saving


        Student savedStudent = studentRepository.save(student);
        return ResponseEntity.ok(savedStudent);
    }
}
