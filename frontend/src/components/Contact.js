import React from 'react'
import './Contact.css'
import mail from "./../assets/imgs/mail.png"
import address from "./../assets/imgs/address.png"
import call from "./../assets/imgs/call.png"
export default function Contact() {
  return (
    <section className='contact--comp'>
        <h2 className='contact--comp__title title'>Carenest</h2>
        <p className='contact--comp__subtitle'>Your Health, Our Priority</p>
        <div className='contact--comp__lists'>
            <div className='contact--comp__list'>
                <img src={mail} alt='time' className='contact--comp__list-img'></img>
                <h2 className='contact--comp__list-title title'>Email</h2>
                <p className='contact--comp__list-para'>info@carenest.com</p>
            </div>
            <div className='contact--comp__list'>
                <img src={address} alt='appointment' className='contact--comp__list-img'></img>
                <h2 className='contact--comp__list-title title'>Find</h2>
                <p className='contact--comp__list-para'>Debrecen, Nagyerdei krt. 98, 4032</p>
            </div>
            <div className='contact--comp__list'>
                <img src={call} alt='service' className='contact--comp__list-img'></img>
                <h2 className='contact--comp__list-title title'>Call</h2>
                <p className='contact--comp__list-para'>(06 52) 411 600</p>
            </div>
        </div>
        <h2 className='contact--comp__copyright'>Copyright &copy; 2024 Carenest</h2>
    </section>
  )
}
