import React, { useState } from 'react';
import './Accordion.css';

const AccordionItem = ({ caseData, isOpen, onToggle }) => {
  const precautions = [
    caseData.precaution1,
    caseData.precaution2,
    caseData.precaution3,
    caseData.precaution4,
  ].filter(Boolean); // Filter out any undefined or null values
  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={onToggle}>
        <div className='accordion--wrapper'>
          <h2>{caseData.title}</h2>
          <p>Date: {caseData.date}</p>
        </div>
        <span className="accordion-icon">{isOpen ? '-' : '+'}</span>
      </div>
      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
        <p><strong>Estimated Disease:</strong> {caseData.disease}</p>
        <p><strong>Description:</strong> {caseData.description}</p>
        <p><strong>Precautions:</strong> {precautions.length > 0 ? precautions.join(', ') : 'No precautions available'}</p>
      </div>
    </div>
  );
};

const Accordion = ({ cases }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {cases.map((caseData, index) => (
        <AccordionItem
          key={index}
          caseData={caseData}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
