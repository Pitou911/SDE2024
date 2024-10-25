import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./PredictComp.css"

const PredictComp = () => {
  const [symptomsList, setSymptomsList] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [precautions, setPrecautions] = useState([]);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get("/datas/symptom_columns.json")
      .then((response) => {
        setSymptomsList(response.data);
      })
      .catch((error) => {
        console.error("Error Loading symptom list: ", error);
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

  return (
    <div className="predict--comp">
      <h2 className="predict--comp__title title">Prognosis Analyzer</h2>
      <form onSubmit={handleSubmit}>
        <h3>Select Symptoms:</h3>
        <Select className="form--select"
          isMulti
          options={options}
          onChange={handleChange}
          placeholder='Search and select symptoms...'
        />
        <button className="title predict--btn" type='submit'>Analyze</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {prediction && <h2>Estimated Prognosis: {prediction}</h2>}
      {precautions.length > 0 && (
        <div className="precuation--wrapper">
          <h3>Precautions:</h3>
          <ul className="precaution--lists">
            {precautions.map((precaution, index) => (
              <li className="precaution--list" key={index}>{precaution}</li>
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
    </div>
  );
};

export default PredictComp;