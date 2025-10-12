const dotenv = require("dotenv")
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authenticateToken } = require("./utilities");

const User = require("./models/user.model");
const Note = require("./models/note.model");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI; 
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({ origin: "*" }));

// ✅ MongoDB Connection
mongoose.connect(MONGO_URI)
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


//GET USER

app.get("/get-user",authenticateToken,async(req,res)=>{
  const user = req.user;
  const isUser = await User.findOne({_id:user._id});

  if(!isUser){
    return res.status(401);
  }

  return res.json({
    user:{fullName:isUser.fullName, email:isUser.email,"_id":isUser._id,createdOn:isUser.createdOn},
    message:"",
  });
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



//EDIT NOTES

app.put("/edit-note/:noteId",authenticateToken,async(req,res)=>{
  const noteId = req.params.noteId;
  const {title,content,tags,isPinned}=req.body;

  const user= req.user;

  if(!title && !content && !tags){
    return res
        .status(400)
        .json({
          error:true,
          message:"No Changes Provided"
        })
  }
  try{
    const note = await Note.findOne({_id:noteId,userId:user._id});

    if(!note){
      return res.status(404).json({
        error:true,
        message:"Note Not Found"
      });
    }
    if(title) note.title=title;
    if(content) note.content=content;
    if(tags) note.tags=tags;
    if(isPinned) note.isPinned=isPinned;

    await note.save();

    return res.json({
      success:true,
      note,
      message:"Note Updated Successfully"
    });
  }catch(error){
    return res.status(500).json({
      error:true,
      message:"Internal Server Error"
    });
  }
});


//GET ALL NOTES

app.get("/get-all-notes",authenticateToken,async(req,res)=>{
  const user=req.user;
  try{
    const notes= await Note.find({userId:user._id
  }).sort({
    isPinned:-1
  });
  return res.json({
    success:true,
    notes,
    message:"All Notes Retrived Successfully",
  });
  }catch(error){
    return res.status(500).json({
      error:true,
      message:"Internal Server Error",
    })
  }
});



//DELETE NOTE

app.delete("/delete-note/:noteId",authenticateToken,async(req,res)=>{
  const noteId=req.params.noteId;
  const user = req.user;
  try{
    const note = await Note.findOne({_id:noteId,userId:user._id});
    if(!note){
      return res.status(404).json({error:true, message:"Note Not Found"});
    }
  await Note.deleteOne({_id:noteId,userId:user._id});

  return res.json({
    success:true,
    message:"Note Deleted Successfully",
  })
  }catch(error){
    return res.status(500).json({
      error:true,
      message:'Internal Server Error'
    });
  }
});


//UPDATE isPinned Value

app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const user = req.user;
  const { isPinned } = req.body;

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(404).json({
        error: true,
        message: "Note Not Found",
      });
    }

    if (typeof isPinned !== "undefined") {
      note.isPinned = isPinned;
    }

    await note.save();

    return res.json({
      success: true,
      note,
      message: "isPinned Updated Successfully",
    });
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});




//Search Notes
app.get("/search-notes",authenticateToken,async(req,res)=>{
  const user = req.user;
  const { query } = req.query;

  if(!query){
    return res.status(400).json({
      error:true,
      message:"Search Query is Required",
    });
  }
  try{
    const matchingNotes = await Note.find({
      userId:user._id,
      $or: [
        { title:{$regex : new RegExp(query,"i") }},
        {content:{ $regex: new RegExp (query,"i")}},
      ],
    });

    return res.json({
      success:true,
      notes: matchingNotes,
      message:"Notes matching the Search Query retrieved Successfully",
    });
  }catch(error){
    return res.status(500).json({
      error:true,
      message:"Internal server error",
    });
  }
})


// =============================
// START SERVER
// =============================
app.listen(8000, () => {
  console.log("🚀 Server running at http://localhost:8000");
});
