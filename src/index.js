const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT ;


mongoose.connect("mongodb://127.0.0.1:27017/Practice")
    .then(() => {
        console.log("Database connection successful hello ");
        app.listen(8001, () => {
            console.log(`Server is serving at port  yessss ${port}`);
        });
    })
    .catch((err) => {
        console.error("Database connection error:", err.message);
    });
