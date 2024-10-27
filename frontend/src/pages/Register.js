import React, { useState } from 'react'
import './Register.css'
import { Link} from 'react-router-dom'
import registerImg from './../assets/imgs/login.png'
export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [studentCard, setStudentCard] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordToggle = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }
    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword){
            setError("Password do not match");
            return;
        }
        try{
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({firstName, lastName, studentCard, email, password})
            });
            if(!response.ok){
                throw new Error('Email or StudenId is already used!')
            }
            window.location.href = '/login';
        }catch(error){
            setError(error.message)
        }
    }
    return (
        <section className='register--comp'>
            <div className='register--comp__wrapper'>
                <div className='register--comp__img-wrapper'>
                    <img src={registerImg} className='register--comp__img' alt='register-img'></img>
                </div>
                <div className="register-container">
                    <h2 className='register-container--title title'>register</h2>
                    <form className="register-form" onSubmit={handleRegister}>
                        <div className='register-form--name'>
                            <input
                            type="text"
                            placeholder="First Name"
                            className="register-input"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                            type="text"
                            placeholder="Last Name"
                            className="register-input"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <input
                        type="text"
                        placeholder="Student ID"
                        className="register-input"
                        value={studentCard}
                        onChange={(e) => setStudentCard(e.target.value)}
                        />
                        <input
                        type="text"
                        placeholder="Email"
                        className="register-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className='password-input-container'>
                            <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="register-input password-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                            
                        </div>
                        <div className='password-input-container'>
                            <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            className="register-input password-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            />
                        </div>
                        <label className='remember-me'>
                            <input type='checkbox'
                                checked={showPassword}
                                onChange={handlePasswordToggle}
                            />
                            Show Password
                        </label>
                        {error && <p className="error-message">{error}</p>}
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
