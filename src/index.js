const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 8000;

async function startServer() {
  try {
    console.log("MONGODB_URL:", process.env.MONGODB_URL);

    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Database connection successful");

    app.listen(port, () => {
      console.log(`🚀 Server is running at port ${port}`);
    });
  } catch (err) {
    console.error("❌ Error in Database connection:", err.message);
  }
}

startServer();
