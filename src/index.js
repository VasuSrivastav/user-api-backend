import express from "express";
import dotenv from "dotenv";
import {connectDB }from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import dashboardRoutes from './routes/dashboard.route.js';
import cors from "cors";

import cookieParser from "cookie-parser";
// import session from 'express-session';

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();

app.use(
  cors({
    origin: "https://assessment-frontend-mu.vercel.app",
    credentials: true,
  })
);
app.use((req, res, next) => {
  // res.removeHeader('Cross-Origin-Opener-Policy');
  // res.removeHeader('Cross-Origin-Embedder-Policy');
  // res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  // res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  next();
});
// const allowedOrigins = [
//   "https://assessment-frontend-mu.vercel.app",
//   "https://another-allowed-origin.com",
//   "https://yet-another-allowed-origin.com"
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

app.use(cookieParser());
// Middleware to parse JSON data in request body
app.use(express.json());

// Middleware to parse url encoded data in request body
app.use(express.urlencoded({ extended: true }));

// Session management middleware
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: process.env.NODE_ENV === 'production' }
// }));

// Middleware to log all incoming requests to the console work as morgan logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});


app.use('/api', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/posts',  postRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
