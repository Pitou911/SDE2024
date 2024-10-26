import React, { useState } from 'react'
import './Login.css'
import loginImg from './../assets/imgs/login.png'
import { Link } from 'react-router-dom'

export default function Login({setIsAuthenticated}) {
    const [identifier, setIdentifier] = useState(''); // For Email or Student ID
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordToggle = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }
    const handleLogin = async (e)  => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({identifier, password})
            });

            if (!response.ok) {
                throw new Error('Invalid Credentials');
            } else {
                const storage = rememberMe ? localStorage : sessionStorage;
                storage.setItem('isAuthenticated', 'true');
                setIsAuthenticated(true);
                window.location.href = '/cases';
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <section className='login--comp'>
            <div className='login--comp__wrapper'>
                <div className='login--comp__img-wrapper'>
                    <img src={loginImg} className='login--comp__img' alt='login-img'></img>
                </div>
                <div className="login-container">
                    <h2 className='login-container--title title'>LOGIN</h2>
                    <form className="login-form" onSubmit={handleLogin}>
                        <input
                        type="text"
                        placeholder="Enter Email or Student ID"
                        className="login-input"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        />
                        <div className='password-input-container'>
                            <input
                            type={showPassword ? 'text':'password'}
                            placeholder="Enter Password"
                            className="login-input password-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                            <button
                                type="button"
                                className="show-password-toggle"
                                onClick={handlePasswordToggle}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {error && <p className="error-message">{error}</p>} {/* Display error message */}
                        <div className="options-container">
                            <label className="remember-me">
                                <input type="checkbox" 
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}/>
                                Remember Me
                            </label>
                            <a href="/" className="forgot-password">Forget Password?</a>
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
