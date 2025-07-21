import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css'; // Import your CSS file
import { auth } from './firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Signup = ({ onLogin }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isValidPassword = (password) => {
        if (password.length < 8) return false;
        return true;
    };

    const handleSignup = () => {
        const errors = [];

        if (!email || !password || !confirmPassword) {
            errors.push('All fields are required');
        } else if (!isValidEmail(email)) {
            errors.push('Invalid Email Format');
        } else if (!isValidPassword(password)) {
            errors.push('Password should be at least 8 characters long');
        } else if (password !== confirmPassword) {
            errors.push('Passwords do not match');
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    await updateProfile(user, {
                        displayName: email,
                    });
                    navigate('/upload');
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    setErrorMsg(errorMessage);
                });
        }

        setErrorMsg(errors.join(', '));
    };

    return (
        <div className="signup-container">
            <h2>Create an Account</h2>
            {errorMsg && <p className="error-message">{errorMsg}</p>}
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="button" onClick={handleSignup}>Sign Up</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
};

export default Signup;
