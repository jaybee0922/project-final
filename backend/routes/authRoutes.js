const express = require("express");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const User = require("../models/User");
const LostDog = require("../models/LostDog");
const FoundDog = require("../models/FoundDog");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const cors = require("cors");

// ============================================ Set up image upload with Multer (Local storage)
// You may replace this with cloud storage logic (S3, Cloudinary, etc.) if you're using cloud storage.

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");  // Change this to cloud storage path if needed
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);  // Use current timestamp to avoid filename conflicts
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size 5MB
  fileFilter: (req, file, cb) => {
    const validImageTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (validImageTypes.includes(file.mimetype)) {
      cb(null, true); // Accept file
    } else {
      cb(new Error("Invalid file type. Only PNG, JPEG, and JPG are allowed.")); // Reject invalid files
    }
  },
});

// ============================================ Lost Dog Image Upload Setup with Multer
const lostDogsDir = path.join(__dirname, "../uploads/lostDogs");
if (!fs.existsSync(lostDogsDir)) {
  fs.mkdirSync(lostDogsDir, { recursive: true });
}

const lostDogStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, lostDogsDir);  // Save to 'uploads/lostDogs'
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);  // Use timestamp for uniqueness
  },
});

// ============================================ Found Dog Image Upload Setup with Multer
const foundDogsDir = path.join(__dirname, "../uploads/foundDogs");
if (!fs.existsSync(foundDogsDir)) {
  fs.mkdirSync(foundDogsDir, { recursive: true });
}

const foundDogStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, foundDogsDir);  // Save to 'uploads/foundDogs'
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);  // Use timestamp for uniqueness
  },
});

// ============================================ CORS Middleware - Update for your deployed frontend domain
const corsOptions = {
  origin: "https://petpalsprojectfordogmatchingtype-g46brjnx.b4a.run",  // Update this with your production React app URL
  methods: ["GET", "POST"],
  credentials: true,
};

router.use(cors(corsOptions)); // Apply CORS middleware globally

// ============================================ Registration Route
router.post("/register", upload.single("profilePic"), async (req, res) => {
  const { username, fullName, email, contact, password, confirmPassword } = req.body;

  if (!username || !fullName || !email || !contact || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords don't match!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user to DB
  const newUser = new User({
    username,
    fullName,
    email,
    contact,
    password: hashedPassword,
    profilePic: req.file ? req.file.path : undefined,  // Store file path if uploaded
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({ message: "Account Created!" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ============================================ Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Username is incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "9h" }
    );

    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ============================================ User Profile Route
router.get("/user/profile", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];  // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: "Authentication token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      fullName: userData.fullName,
      profilePic: userData.profilePic ? `/uploads/${path.basename(userData.profilePic)}` : '/uploads/default-user.png', // Correct path for image
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ============================================ Lost Dog Profile Route
router.post("/lostdog", multer({ storage: lostDogStorage }).single("dogImage"), async (req, res) => {
  const { name, breed, color, size, gender, location, details } = req.body;

  if (!name || !breed || !color || !size || !gender || !location) {
    return res.status(400).json({ message: "All fields except details are required!" });
  }

  try {
    const lostDogCount = await LostDog.countDocuments();
    const petId = lostDogCount + 1;  // Auto-increment ID

    const imagePath = req.file ? "/uploads/lostDogs/" + req.file.filename : undefined;

    const lostDogProfile = new LostDog({
      petId,
      name,
      breed,
      color,
      size,
      gender,
      location,
      details,
      imagePath,
    });

    const savedLostDog = await lostDogProfile.save();
    res.status(201).json({
      message: "Lost dog profile created successfully!",
      lostDog: savedLostDog,
    });
  } catch (error) {
    console.error("Error saving lost dog profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ============================================ Found Dog Profile Route
router.post("/founddog", multer({ storage: foundDogStorage }).single("dogImage"), async (req, res) => {
  const { name, breed, color, size, gender, location, details } = req.body;

  if (!name || !breed || !color || !size || !gender || !location) {
    return res.status(400).json({ message: "All fields except details are required!" });
  }

  try {
    const foundDogCount = await FoundDog.countDocuments();
    const petId = foundDogCount + 1;  // Auto-increment ID

    const imagePath = req.file ? "/uploads/foundDogs/" + req.file.filename : undefined;

    const foundDogProfile = new FoundDog({
      petId,
      name,
      breed,
      color,
      size,
      gender,
      location,
      details,
      imagePath,
    });

    const savedFoundDog = await foundDogProfile.save();
    res.status(201).json({
      message: "Found dog profile created successfully!",
      foundDog: savedFoundDog,
    });
  } catch (error) {
    console.error("Error saving found dog profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ============================================ Fetch All Lost Dogs Route
router.get("/lostdog", async (req, res) => {
  try {
    const lostDogs = await LostDog.find();
    res.status(200).json({ lostDogs });
  } catch (error) {
    console.error("Error fetching lost dogs:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ============================================ Fetch All Found Dogs Route
router.get("/founddog", async (req, res) => {
  try {
    const foundDogs = await FoundDog.find();
    res.status(200).json({ foundDogs });
  } catch (error) {
    console.error("Error fetching found dogs:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
