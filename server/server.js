const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "Admin",
  password: "Admin@123",
  database: "signupdb", // your DB
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

// Signup
app.post("/api/auth/signup", (req, res) => {
  const { name, username, email, phone, password } = req.body;

  if (!name || !username || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql =
    "INSERT INTO users (name, username, email, phone, password) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [name, username, email, phone, password], (err, result) => {
    if (err) {
      console.error("❌ Error inserting data:", err);
      return res.status(500).json({ message: "No same user store", error: err });
    }
    res.status(201).json({ message: "Signup successful", id: result.insertId });
  });
});

// Login
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length > 0) {
      res.status(200).json({ message: "Login successful", user: results[0] });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

app.get("/api/auth/login", (req, res) => {
  const { username, password } = req.query; // get from query string

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length > 0) {
      res.status(200).json({ message: "Login successful", user: results[0] });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
