import React, { useEffect, useState } from 'react';
import Cases from './Cases';
import "./ParentComponent.css"
import PredictComp from '../components/PredictComp';

const ParentComponent = () => {
  const [cases, setCases] = useState([]);
  const studentId = localStorage.getItem('student_id') || sessionStorage.getItem('student_id');

  // Fetch cases when the component mounts or when the studentId changes
  useEffect(() => {
    if (!studentId) {
      console.error("Student ID is not found in localStorage or sessionStorage");
      return;
    }

    const fetchCases = async () => {
      try {
        const response = await fetch(`http://localhost:8080/health-cases/student/${studentId}`);
        const data = await response.json();
        const formattedCases = data.map((caseData, index) => ({
          title: `Case ${index + 1}`,
          date: caseData.date,
          disease: caseData.diseaseName,
          description: caseData.diseaseDescription,
          precautions: [
            caseData.precaution1,
            caseData.precaution2,
            caseData.precaution3,
            caseData.precaution4
          ].filter(Boolean),
        }));
        setCases(formattedCases);
      } catch (error) {
        console.error('Error fetching health cases:', error);
      }
    };

    fetchCases();
  }, [setCases, studentId]);

  const addNewCase = (newCase) => {
    setCases((prevCases) => [...prevCases, newCase]);
    console.log(cases)
  };

  return (
    <section className='parent--comp'>
      <div className='parent--comp__wrapper'>
        <h1 className='parent--comp__title title'>Cases</h1>
        <PredictComp addNewCase={addNewCase} />
        <Cases cases={cases} />
      </div>
    </section>
  );
};

export default ParentComponent;
