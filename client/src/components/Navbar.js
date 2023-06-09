import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = (Props) => {

    const logout = () => {
        Cookies.remove('token');
        Props.toggleLoginStatus(false);
    }

    return (<>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark py-3">
            <div className="container">
                <Link className="navbar-brand" style={{ color: "#FFC107" }} to={'/'}>WhisperVault</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav text-center">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to={'/dashboard'}>Secrets</Link>
                        </li>
                        <li className="nav-item">
                            {Props.loggedIn ? <>
                                <Link className="nav-link active" onClick={logout} to={'/'}>Logout</Link>
                            </> : <>
                                <Link className="nav-link active" aria-current="page" to={'/account/login'}>Login</Link>
                            </>}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>);
}

export default Navbar;