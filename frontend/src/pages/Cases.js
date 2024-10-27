import React from 'react'
import Accordion from '../components/Accordion'

function Cases({cases}) {
  return (
    <section>
      <div>
        <h1 className='title'>Cases</h1>
        <Accordion cases={cases} />
      </div>
    </section>
  );
}

export default Cases
