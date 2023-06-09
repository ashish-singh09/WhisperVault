import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import axios from 'axios';

const Register = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: '',
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

    const userRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("/api/user/register", user);

            console.log(res.status);
            if (res.status === 200 && res.data.msg === "Signup sucessfull!") {
                window.alert(res.data.msg);
                navigate('/account/login');

                setUser({
                    name: '',
                    username: '',
                    password: ''
                });
            }

        } catch (error) {
            setUser({
                ...user,
                username: '',
                password: ''
            });

            console.log(error.response.data);
            window.alert(error.response.data.msg);
        }
    }

    return (<>
        <div className='container loginHolder'>
            <div className='loginForm'>
                <form method='POST' onSubmit={userRegister}>
                    <h1 className='mb-4 text-center'>Register</h1>
                    <div className='mb-2'>
                        <label htmlFor="name" className="form-label">Name</label>
                        <input className='form-control' minLength={5} maxLength={25} id='name' required name='name' type='text' value={user.name} onChange={handleInput} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="username" className="form-label">Email</label>
                        <input className='form-control' minLength={8} maxLength={40} id='username' required name='username' type='text' value={user.username} onChange={handleInput} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password" className="form-label">Password</label>
                        <input className='form-control' minLength={8} maxLength={30} id='password' required name='password' type='text' value={user.password} onChange={handleInput} />
                    </div>
                    <button className='btn mt-2' id='btnlogin' type='submit'>Submit</button>
                </form>
                <div>
                    <p style={{ fontSize: "0.9rem" }} className='tagline mt-3'>Have an account? <Link to={'/account/login'} >Login.</Link></p>
                </div>
            </div>
        </div>
    </>);
}

export default Register;