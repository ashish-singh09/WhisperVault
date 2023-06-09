const mongoose = require("mongoose");

const url = process.env.DATABASE;
mongoose.set('strictQuery', false);
mongoose.connect(url).then(() => {
    console.log("Connection successful");
}).catch((err) => console.log("No connection"));