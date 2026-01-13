import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    // ✅ Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // ✅ Handle signup submit
    const handleSignup = async (e) => {
        e.preventDefault();

        const { name, email, password } = signupInfo;

        // ✅ Basic validation
        if (!name || !email || !password) {
            handleError('Name, email and password are required');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const result = await response.json();
            console.log('Signup response:', result);

            if (response.ok && result.success) {
                handleSuccess(result.message || 'Signup successful');

                setTimeout(() => {
                    navigate('/login');
                }, 1000);

            } else {
                handleError(result.message || 'Signup failed');
            }

        } catch (error) {
            console.error('Signup error:', error);
            handleError('Server error. Please try again later.');
        }
    };

    return (
        <div className="container">
            <h1>Signup</h1>

            <form onSubmit={handleSignup}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={signupInfo.name}
                        onChange={handleChange}
                        autoFocus
                    />
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={signupInfo.email}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={signupInfo.password}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Signup</button>

                <p>
                  If You Already have an account?{' '}
                    <Link to="/login">Login</Link>
                </p>
            </form>

            <ToastContainer />
        </div>
    );
}

export default Signup;
