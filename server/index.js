require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authenticateToken } = require("./utilities");

const User = require("./models/user.model");
const Note = require("./models/note.model");
const config = require("./config.json");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// ✅ MongoDB Connection
mongoose.connect(config.connectionString)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.json({ data: "Hello World!" });
});



// CREATE ACCOUNT (Sign Up)

app.post("/create-account", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({ error: true, message: "User already exists" });
    }

    // Hash password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    await user.save();

    // Include both _id and email in token
    const accessToken = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3600m" }
    );

    return res.json({
      success: true,
      user,
      accessToken,
      message: "Account created successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});



// LOGIN (Sign In)

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: true, message: "All fields are required" });

    const userInfo = await User.findOne({ email });
    if (!userInfo)
      return res.status(400).json({ error: true, message: "User not found" });

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, userInfo.password);
    if (!isMatch)
      return res.status(400).json({ error: true, message: "Invalid password" });

    const accessToken = jwt.sign(
      { _id: userInfo._id, email: userInfo.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3600m" }
    );

    return res.json({
      success: true,
      message: "Login successful",
      user: userInfo,
      accessToken,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});



// ADD NOTE (Protected Route)

app.post("/add-note", authenticateToken, async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const user = req.user; // decoded from JWT

    if (!title || !content) {
      return res.status(400).json({ error: true, message: "Title and Content are required" });
    }

    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id, // Works now because _id is in JWT
    });

    await note.save();

    return res.json({
      success: true,
      note,
      message: "Note added successfully",
    });
  } catch (error) {
    console.error("Error while adding note:", error);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});


// =============================
// START SERVER
// =============================
app.listen(8000, () => {
  console.log("🚀 Server running at http://localhost:8000");
});
