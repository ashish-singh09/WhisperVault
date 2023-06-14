require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');

const User = require('./models/user');
const Secret = require('./models/secret');

const app = express();
require('./DB/conn');

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;


app.post("/api/user/login", async (req, res) => {

    const { username, password } = req.body;

    try {

        if (!username || !password) {
            return res.status(400).json({ msg: "Invalid inputs!" });
        }

        const user = await User.findOne({ username });

        if (!user || user.password !== password) {
            return res.status(400).json({ msg: "Invalid credentials!" });
        }

        const test = {
            _id: user.id,
            name: user.username,
            username: user.username
        }
        const token = jwt.sign(test, process.env.JWT_SECRET);

        res.cookie('token', token, {
            expires: new Date(Date.now() + 6000000),
            httpOnly: true
        });

        return res.status(200).json({ msg: "Login sucessfull!" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Login failed!" });
    }
})

app.post("/api/user/register", async (req, res) => {

    const { name, username, password } = req.body;

    let user = await User.findOne({ username: username });
    if (user) {
        return res.status(400).json({ msg: "User already exists!" });
    }
    if (name.length > 25 || name.length < 5 || password.length < 8 || password.length > 30 || username > 40 || username < 8) {
        return res.status(400).json({ msg: "Invalid Input!" });
    }

    try {

        let user = await User.findOne({username});
        if(user) return res.status(400).json({ msg: "User already Exists!" });

        user = await User.create({ name, username, password });

        return res.status(200).json({ msg: "Signup sucessfull!" });

    } catch (error) {
        console.log(error);
        return res.status(200).json({ msg: "Signup Failed!" });
    }
})

app.get("/api/user/dashboard", (req, res) => {

    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(400).json({ login: "bad" });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (decode._id) return res.status(200).json({ login: "ok" });
    } catch (error) {
        return res.status(400).json({ login: "bad" });
    }
})

app.post("/api/user/add/secret", async (req, res) => {

    const token = req.headers['x-access-token'];
    const { secretText, name } = req.body;

    if (!token) {
        return res.status(400).json({ msg: "bad_login" });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if (!secretText || !name) return res.status(400).json({ msg: "Invalid inputs!" });

        if (decode._id) {
            await Secret.create({ secretText, name });
        }

        return res.status(200).json({ msg: "ok" });
    } catch (error) {
        return res.status(400).json({ msg: "bad_login" });
    }
})

app.get("/api/user/get/secret", async (req, res) => {

    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(400).json({ msg: "bad_login" });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if (decode._id) {
            const secretList = await Secret.find();
            return res.status(200).json(secretList);
        }
    } catch (error) {
        return res.status(400).json({ msg: "bad_login" });
    }
})


// Serving the Frontend
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html")),
    function (err){
        res.status(500).send(err);
    }
});


app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});