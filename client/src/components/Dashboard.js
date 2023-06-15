import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import "react-loading-skeleton/dist/skeleton.css";

import SecretCardSkeleton from './SecretCardSkeleton';
import SecretMsg from './SecretMsg';

const Dashboard = (Props) => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [secretList, setSecretList] = useState(null);
    const [secret, setSecret] = useState({
        secretText: '',
        name: 'Unknown Whisperer'
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setSecret({
            ...secret,
            [name]: value
        });
    }

    const checkLogin = async () => {
        try {

            const res = await axios.get('/api/user/dashboard');

            if (res.status === 200 && res.data.login === "ok") {
                setLoggedIn(true);
                Props.toggleLoginStatus(true);
            }

            getSecret();

        } catch (error) {
            console.log(error);
            setLoading(false);
            setLoggedIn(false);
            navigate("/account/login");
        }
    }

    const submitSecret = async (e) => {
        e.preventDefault();

        try {

            const res = await axios.post('/api/user/add/secret', secret);

            if (res.status === 200 && res.data.msg === "ok") {
                setSecret({
                    secretText: '',
                    name: 'Unknown Whisperer'
                });

                getSecret();
                closeForm();
            }

        } catch (error) {
            window.alert(error.response.data.msg);
            if (error.response.status === 400 && error.response.data.msg === "bad_login") {
                Cookies.remove('token');
                navigate('/account/login');
            }
        }
    }

    const getSecret = async () => {
        try {

            const res = await axios.get('/api/user/get/secret');

            if (res.status === 200) {
                setLoading(false);
                setSecretList(res.data);
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 400 && error.response.data.msg === "bad_login") {
                Cookies.remove('token');
                navigate('/account/login');
            }
        }
    }

    const closeForm = () => document.getElementById("closeSecretForm").click();

    useEffect(() => {
        checkLogin();
    }, []);

    return (<>
        <div className='container my-4 '>
            <div className='scrollSecret'>
                {loading ? <>
                    <div>
                        <SecretCardSkeleton />
                        <SecretCardSkeleton />
                        <SecretCardSkeleton />
                        <SecretCardSkeleton />
                        <SecretCardSkeleton />
                    </div>
                </> : <>
                    {loggedIn ? <div style={{ height: "75vh" }}>
                        <div>
                            {secretList && secretList.map(msg => {

                                return <SecretMsg name={msg.name} secretText={msg.secretText} />
                            })}
                        </div>
                    </div> : <h1>Please Login to view this page..</h1>}
                </>}

                {/* Button trigger modal */}
                <div className='secretHolder'>
                    <h1>
                        <button className='btn addSecret' type='button' data-bs-toggle="modal" data-bs-target="#submitSecret">
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </h1>
                </div>
            </div>

            {/* Modal */}
            <div className="modal fade" id="submitSecret" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Tell your Secret</h1>
                            <button id='closeSecretForm' style={{ backgroundColor: "#00bcd4" }} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='addSecretForm'>
                                <form method='POST' onSubmit={submitSecret}>
                                    <div className='mb-2'>
                                        <label htmlFor="secretText" className="form-label">*Secret</label>
                                        <textarea rows={3} className='form-control' minLength={10} maxLength={300} id='secretText' required name='secretText' type='text'
                                            style={{ backgroundColor: "#272a2f", color: "#fff", border: "1px solid #138fd4" }} value={secret.secretText} onChange={handleInput} />
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor="name" className="form-label">Name (optional)</label>
                                        <input className='form-control' id='name' minLength={5} maxLength={30} required name='name' type='text' value={secret.name} onChange={handleInput} />
                                    </div>
                                    <button className='btn mt-2' id='btnlogin' type='submit'>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>);
}

export default Dashboard;