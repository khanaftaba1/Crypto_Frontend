import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";

import '../Login/Login.css';

function Signup() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [networkError, setNetworkError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted");
        const validationErrors = Validation(values);
        setErrors(validationErrors);
        setIsSubmitting(true);
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    useEffect(() => {
        if (isSubmitting) {
            console.log("Is submitting:", isSubmitting);
            if (Object.keys(errors).every((key) => errors[key] === '')) {
                console.log("No validation errors, proceeding with API request");
                axios.post('http://127.0.0.1:5000/signup', values)
                    .then(res => {
                        console.log("Signup successful", res);
                        navigate('/');
                    })
                    .catch(err => {
                        console.error("Error during signup", err);
                        setNetworkError('Failed to connect to the server. Please try again later.');
                    });
            } else {
                console.log("Validation errors:", errors);
            }
            setIsSubmitting(false);
        }
    }, [isSubmitting, errors, values, navigate]);

    return (
        <div className='wrapper'>
            <div className='login-form'>
                <div className='form-box register'>
                    <form method="post" action='' onSubmit={handleSubmit}>
                        <h1>Sign Up</h1>
                        {networkError && <div className="alert alert-danger">{networkError}</div>}
                        
                        <div className='input-box'>
                            <input
                                type="email"
                                placeholder='Enter Email'
                                name='email'
                                value={values.email}
                                onChange={handleInput}
                            />
                            <FaEnvelope className='icon' />
                            {errors.email && <span className='text-danger error-message'>{errors.email}</span>}
                        </div>
                        
                        <div className='input-box'>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder='Enter Password'
                                name='password'
                                value={values.password}
                                onChange={handleInput}
                            />
                            <span className='icon' onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                            {errors.password && <span className='text-danger error-message'>{errors.password}</span>}
                        </div>
                        
                        <div className='input-box'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder='Confirm Password'
                                name='confirmPassword'
                                value={values.confirmPassword}
                                onChange={handleInput}
                            />
                            <span className='icon' onClick={toggleConfirmPasswordVisibility}>
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                            {errors.confirmPassword && <span className='text-danger error-message'>{errors.confirmPassword}</span>}
                        </div>
                        
                        <div className='remember-forgot'>
                            <label><input type='checkbox' required/>I agree to the terms & conditions.</label>
                        </div>
                        
                        <button type='submit'>Sign Up</button>
                        
                        <div className='register-link'>
                            <p>Already have an account? <Link className='below' to="/">Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
