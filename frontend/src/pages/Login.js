import React from 'react'
import './Login.css'
import login from './../assets/imgs/login.png'
import { Link } from 'react-router-dom'
export default function Login() {
  return (
    <section className='login--comp'>
        <div className='login--comp__wrapper'>
            <div className='login--comp__img-wrapper'>
                <img src={login} className='login--comp__img' alt='login-img'></img>
            </div>
            <div className="login-container">
                <h2 className='login-container--title title'>LOGIN</h2>
                <form className="login-form">
                    <input
                    type="text"
                    placeholder="Enter Email or Student ID"
                    className="login-input"
                    />
                    <input
                    type="password"
                    placeholder="Enter Password"
                    className="login-input"
                    />
                    <div className="options-container">
                    <label className="remember-me">
                        <input type="checkbox" />
                        Remember Me
                    </label>
                    <a href="#" className="forgot-password">Forget Password?</a>
                    </div>
                    <button type="submit" className="login-button title">Login</button>
                </form>
                <div className="signup-container">
                    <p>Doesn't have an account? <Link to='/register' className="signup-link">Sign Up</Link></p>
                </div>
            </div>
        </div>
    </section>
  )
}
