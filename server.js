const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");

const connectDB = require("./config/database");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
const PORT = process.env.PORT || 3000;

// SSL options
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, "certs", "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "certs", "cert.pem")),
};

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/employees", require("./routes/employees"));
app.use("/api/leaves", require("./routes/leaves"));

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// HTTPS server
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`🔐 HTTPS Server running at https://localhost:${PORT}`);
});
