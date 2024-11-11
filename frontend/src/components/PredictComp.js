import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./PredictComp.css";

const PredictComp = ({ addNewCase }) => {
  const [symptomsList, setSymptomsList] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [precautions, setPrecautions] = useState([]);
  const [description, setDescription] = useState("");
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  useEffect(() => {
    // Check for student_card_id in both localStorage and sessionStorage
    const storedStudentId =
      localStorage.getItem("student_id") ||
      sessionStorage.getItem("student_id");

    if (storedStudentId) {
      setStudentId(storedStudentId);
    }

    // Load symptom data
    axios
      .get("/datas/symptom_columns.json")
      .then((response) => {
        setSymptomsList(response.data);
      })
      .catch((error) => {
        console.error("Error loading symptom list: ", error);
      });

    // Fetch doctors list for modal
    axios
      .get("http://localhost:8080/api/doctors") // Adjust URL as needed for your backend
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error loading doctor list: ", error);
      });
  }, []);

  const options = symptomsList.map((symptom) => ({
    value: symptom,
    label: symptom.replace(/_/g, " "), // Format for display
  }));

  const handleChange = (selectedOptions) => {
    setSelectedSymptoms(selectedOptions.map((option) => option.value)); // Extract values from selected options
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setPrediction(null);
    setPrecautions([]);
    setDescription("");
    // Check if any symptom is selected
    if (selectedSymptoms.length === 0) {
      setError("Please select at least one symptom.");
      return;
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        {
          symptoms: selectedSymptoms,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setPrediction(response.data.prognosis);
      setPrecautions(response.data.precautions || []);
      setDescription(response.data.description);
    } catch (err) {
      console.error(err);
      setError("Error occurred while making the prediction.");
    }
  };

  const handleCreateCase = async () => {
    const currentDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
    const healthCase = {
      date: currentDate,
      diseaseName: prediction,
      studentId: studentId,
    };
    try {
      await axios.post("http://localhost:8080/health-cases", healthCase, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      addNewCase(healthCase);
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError("Error occurred while creating the health case.");
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="predict--comp">
      <h2 className="predict--comp__title title">Prognosis Analyzer</h2>
      <form onSubmit={handleSubmit}>
        <h3>Select Symptoms:</h3>
        <Select
          className="form--select"
          isMulti
          options={options}
          onChange={handleChange}
          placeholder="Search and select symptoms..."
        />
        <button className="title predict--btn" type="submit">
          Analyze
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {prediction && <h2>Estimated Prognosis: {prediction}</h2>}
      {precautions.length > 0 && (
        <div className="precuation--wrapper">
          <h3>Precautions:</h3>
          <ul className="precaution--lists">
            {precautions.map((precaution, index) => (
              <li className="precaution--list" key={index}>
                {precaution}
              </li>
            ))}
          </ul>
        </div>
      )}
      {description && (
        <div className="disease--description__wrapper">
          <h3>Description:</h3>
          <p className="disease--description">{description}</p>
        </div>
      )}
      {description && (
        <button className="title create-case-btn" onClick={handleCreateCase}>
          Save Case
        </button>
      )}
      {description && (
        <button
          className="title save-and-send-btn create-case-btn"
          onClick={openModal}
        >
          Save And Send Case
        </button>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Select a Doctor to Notify</h3>
            <button className="close-btn" onClick={closeModal}>
              X
            </button>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>Action</th> {/* Add column for actions */}
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td>{doctor.name}</td>
                    <td>{doctor.phoneNumber}</td>
                    <td>{doctor.email}</td>
                    <td>{doctor.location}</td>
                    <td>
                      <a
                        href={`mailto:${doctor.email}?subject=${encodeURIComponent(
                          prediction
                        )}&body=${encodeURIComponent(precautions.join("\n"))}`}
                        className="send-email-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleCreateCase}
                      >
                        Send Email
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictComp;
