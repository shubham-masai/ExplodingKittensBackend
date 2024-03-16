const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const { connections } = require("./db");
app.use(express.json());
app.listen(8080, async () => {
    try {
        await connections
        console.log("db is connected")
    } catch (error) {
        console.log(error);
    }
})