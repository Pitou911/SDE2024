CREATE TABLE Login (
    login_id INT PRIMARY KEY NOT NULL,
    student_id INT NOT NULL,
    email VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES Students(d_id)
);

CREATE TABLE Students (
    d_id INT NOT NULL,
    student_card_id INT NOT NULL,
    email VARCHAR(20) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    registration_date INT,
    PRIMARY KEY (d_id, student_card_id)
);

CREATE TABLE Cases (
    case_id INT PRIMARY KEY NOT NULL,
    student_id INT NOT NULL,
    symptom_desc VARCHAR(20),
    disease_diagnosed VARCHAR(20),
    date_of_input INT,
    precautions VARCHAR(20),
    CONSTRAINT fk_case_student FOREIGN KEY (student_id) REFERENCES Students(d_id)
);
