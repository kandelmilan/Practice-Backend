const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT ;



mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Database connection successful hello ");
        app.listen(port, () => {
            console.log(`Server is serving at port  yessss ${port}`);
        });
    })
    .catch((err) => {
        console.log("Error in DataBase connection");
    });
