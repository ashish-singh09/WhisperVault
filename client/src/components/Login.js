import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUser({
            ...user,
            [name]: value
        });
    }

    const userLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("/api/user/login", user, { withCredentials: true });

            if (res.status === 200 && res.data.msg === 'Login sucessfull!') {
                navigate('/dashboard');
            }

        } catch (error) {
            window.alert(error.response.data.msg);
            setUser({
                ...user,
                password: ''
            });
        }
    }

    return (<>
        <div className='container loginHolder'>
            <div className='loginForm'>
                <form method='POST' onSubmit={userLogin}>
                    <h1 className='mb-4 text-center'>Login</h1>
                    <div className='mb-2'>
                        <label htmlFor="username" className="form-label">Email</label>
                        <input className='form-control' id='username' required name='username' type='text' value={user.username} onChange={handleInput} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password" className="form-label">Password</label>
                        <input className='form-control' id='password' required name='password' type='text' value={user.password} onChange={handleInput} />
                    </div>
                    <button className='btn mt-2' id='btnlogin' type='submit'>Login</button>
                </form>
                <div>
                    <p style={{ fontSize: "0.9rem" }} className='tagline mt-3'>Don't have an account? <Link to={'/account/register'} >Signup.</Link></p>
                </div>
            </div>
        </div>
    </>);
}

export default Login;