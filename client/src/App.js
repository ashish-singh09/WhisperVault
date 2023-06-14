import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Home from "./components/Home";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  const toggleLogin = (state) => {
    setLoggedIn(state);
  }

  return (
    <div className="App">
      <Navbar loggedIn={loggedIn} toggleLoginStatus={toggleLogin} />
      <Routes>
        <Route path="/" element={<Home toggleLoginStatus={toggleLogin}/>} />
        <Route path="/account/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard toggleLoginStatus={toggleLogin} />} />
        <Route path="/account/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
