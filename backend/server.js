const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require('./routes/postRoutes'); // Import the new post routes
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const User = require("./models/User"); // Import User model here
const app = express();
const jwt = require("jsonwebtoken");

// ============================================ Load environment variables
dotenv.config();

// ============================================ Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ============================================ 'uploads' directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// ============================================ Fetch user data by ID route
app.get("/api/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json({
        fullName: user.fullName,
        profilePic: `${process.env.REACT_APP_BASE_URL}/uploads/${user.profilePic}`, // Dynamically include base URL for images
      });
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

// ============================================ Configure CORS
const corsOptions = {
  origin: process.env.REACT_APP_BASE_URL || "http://localhost:3000", // Allow both local and production front-end URLs
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));  // Use updated CORS options

// ============================================ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// ============================================ Routes
app.use("/api/auth", authRoutes);
app.use('/api/posts', postRoutes); // Use the new post routes

// ============================================ Serve Static Files for React in Production
if (process.env.NODE_ENV === 'production') {
  // Serve the React app
  app.use(express.static(path.join(__dirname, 'build')));

  // Catch-all handler for all other routes, serving the React app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

// ============================================ Server Port Configuration
const port = process.env.PORT || 5000;  // Use port from environment variable (for production)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
