// Require necessary modules
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const createError = require("http-errors");




// Require routes
const authRouter = require("./routes/authRoutes");
const candidateRouter = require("./routes/candidateRoutes");
const voteRouter = require("./routes/voteRoutes");

// Connect to database
const connectDB = require("./config/connect");

// Set up environment variable for port
const PORT = process.env.PORT || 8080;

// Create Express app
const app = express();

// Serve static files from the 'photos' folder
app.use('/images', express.static(path.join(__dirname, './images')));

// Helmet middleware for security
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "example.com"],
      },
    },
    xssFilter: true,
    noSniff: true,
    referrerPolicy: true,
    hsts: true,
    hidePoweredBy: true,
    noCache: true,
    XContentOptions: "nosniff",
  })
);

// CORS middleware for Cross-Origin Resource Sharing
app.use(
  cors({
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Logger middleware for request logging
app.use(logger("dev"));

// Middleware for parsing request bodies and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Mount authentication routes
app.use("/users", authRouter);

// Mount candidate routes
app.use("/candidates", candidateRouter);

// Mount vote routes
app.use("/votes", voteRouter);



// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Connect to database
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the app
module.exports = app;
