import React from 'react'
import Accordion from '../components/Accordion'
import './Cases.css'
import PredictComp from '../components/PredictComp';

function Cases() {
  const cases = [
    {
      title: 'Case 1',
      date: '2024-10-25',
      symptoms: ['skin rash', 'chills'],
      disease: 'Drug Reaction',
      precautions: ['stop irritation', 'consult nearest hospital', 'stop taking drug', 'follow up']
    },
    {
      title: 'Case 2',
      date: '2024-10-24',
      symptoms: ['fever', 'cough'],
      disease: 'Common Cold',
      precautions: ['drink vitamin C rich drinks', 'take vapor', 'avoid cold food', 'keep fever in check']
    },
    // Add more cases as needed
  ];
  return (
    <section className='cases--comp'>
      <div className='cases--comp__wrapper'>
        <h1 className='cases--comp__title title'>Cases</h1>
        <PredictComp/>
        <Accordion cases={cases}/>
      </div>
    </section>
  )
}

export default Cases
