import React from 'react'
import "./Mission.css"
import time from "./../assets/imgs/time.png"
import appointment from "./../assets/imgs/appointment.png"
import service from "./../assets/imgs/247.png"
export default function Mission() {
  return (
    <section className='mission--comp'>
        <h1 className='mission--comp__header title'>Our Mission</h1>
        <div className='mission--comp__lists'>
            <div className='mission--comp__list'>
                <img src={time} alt='time' className='mission--comp__list-img'></img>
                <h2 className='mission--comp__list-title title'>fast symptom checks</h2>
                <p className='mission--comp__list-para'>Get your symptoms reviewed online, reducing the need to wait for hours in clinic.</p>
            </div>
            <div className='mission--comp__list'>
                <img src={appointment} alt='appointment' className='mission--comp__list-img'></img>
                <h2 className='mission--comp__list-title title'>Book Appointment</h2>
                <p className='mission--comp__list-para'>Book appointments without a hassle of phone calls or long waits.</p>
            </div>
            <div className='mission--comp__list'>
                <img src={service} alt='service' className='mission--comp__list-img'></img>
                <h2 className='mission--comp__list-title title'>24/7 service</h2>
                <p className='mission--comp__list-para'>We offer support around the clock, so you're never left in the dark about your health.</p>
            </div>
        </div>
    </section>
  )
}
