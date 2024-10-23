import React from 'react'
import './Register.css'
import { Link } from 'react-router-dom'
import register from './../assets/imgs/login.png'
export default function Register() {
  return (
    <section className='register--comp'>
        <div className='register--comp__wrapper'>
            <div className='register--comp__img-wrapper'>
                <img src={register} className='register--comp__img' alt='register-img'></img>
            </div>
            <div className="register-container">
                <h2 className='register-container--title title'>register</h2>
                <form className="register-form">
                    <div className='register-form--name'>
                        <input
                        type="text"
                        placeholder="First Name"
                        className="register-input"
                        />
                        <input
                        type="text"
                        placeholder="Last Name"
                        className="register-input"
                        />
                    </div>
                    <input
                    type="text"
                    placeholder="Student ID"
                    className="register-input"
                    />
                    <input
                    type="text"
                    placeholder="Email"
                    className="register-input"
                    />
                    <input
                    type="password"
                    placeholder="Password"
                    className="register-input"
                    />
                    <input
                    type="password"
                    placeholder="Confirm Password"
                    className="register-input"
                    />
                    
                    <button type="submit" className="register-button title">Register</button>
                </form>
                <div className="log-in-container">
                    <p>Already have an account? <Link to='/login' className="log-in-link">Login</Link></p>
                </div>
            </div>
        </div>
    </section>
  )
}
