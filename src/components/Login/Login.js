import React, { useState } from 'react';
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import './Login.css';

function Login() {
    const [values, setValues] = useState({
        email: localStorage.getItem('userEmail') || '',
        password: localStorage.getItem('userPassword') || ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        if (validationErrors.email === "" && validationErrors.password === "") {
            console.log({ email: values.email });

            axios.post('http://127.0.0.1:5000/login', values)
            .then(res => {
                if (res.data.access_token) { 
                    console.log(res.data.access_token);
                    const accessToken = res.data.access_token;
                    localStorage.setItem('accessToken', accessToken);
                    console.log("Login successful!");
                    navigate('/dashboard');
                    // Optionally, you can redirect to another page here
                } else {
                    alert("Login failed. Please check your credentials.");
                }
            })
            .catch(err => {
                console.error("Failed to connect to the server. Please try again later.", err);
                alert("Failed to connect to the server. Please try again later.");
            });
        
               
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='wrapper'>
            <div className='login-form'>
                <div className='form-box login'>
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <div className='input-box'>
                            <input
                                type="email"
                                placeholder='Enter Email'
                                name='email'
                                value={values.email}
                                onChange={handleInput}
                            />
                            <FaEnvelope className='icon' />
                            {errors.email && <span className='text-danger'>{errors.email}</span>}
                        </div>
                        <div className='input-box'>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder='Enter Password'
                                name='password'
                                value={values.password}
                                onChange={handleInput}
                            />
                            {showPassword ? (
                                <FaEyeSlash className='icon' onClick={togglePasswordVisibility} />
                            ) : (
                                <FaEye className='icon' onClick={togglePasswordVisibility} />
                            )}
                            {errors.password && <span className='text-danger'>{errors.password}</span>}
                        </div>
                        <div className='remember-forgot'>
                            <label><input type='checkbox' />Remember me</label>
                            <Link to='#'>Forgot password?</Link>
                        </div>
                        <button type='submit'>Log in</button>
                        <div className='register-link'>
                            <p>Don't have an account? <Link className='below' to="/signup">Register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
