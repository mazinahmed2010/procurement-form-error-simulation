const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

/*
  مستخدمون تجريبيون
  (لاحقًا من MongoDB)
*/
const users = [
  { username: "manager1", password: "123", role: "manager" },
  { username: "agent1", password: "123", role: "agent" },
  { username: "director1", password: "123", role: "director" },
];

// Login API
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password",
    });
  }

  res.json({
    success: true,
    username: user.username,
    role: user.role,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
