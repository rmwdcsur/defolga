const express = require("express");
const connectDB = require("./config/database");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const passport = require("passport");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Allow cors origins
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Middleware
app.use(express.json());
app.use(passport.initialize());
app.use(
  session({
    secret: "defolga2026",
    resave: false,
    saveUninitialized: true,
  }),
);

// Routes
// Serve the login page at the root URL
const path = require("path");
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html")); // Ensure the login.html is in the 'public' folder
});
app.use("/api/employees", require("./routes/employees"));
app.use("/api/leaves", require("./routes/leaves"));
// Add the authentication routes
app.use("/auth", authRoutes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
