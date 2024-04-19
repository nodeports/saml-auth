import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import passport from "passport";
import samlConfig from "./config/saml";
import authRoutes from "./routes/auth";
import User from "./models/user";
import { Strategy as SamlStrategy } from "@node-saml/passport-saml";

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/saml-auth", {});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

// Passport SAML Strategy
passport.use(
  new SamlStrategy(
    samlConfig,
    (profile, done) => {
      User.findOne({ email: profile.email }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          const newUser = new User({
            email: profile.email,
            name: profile.name,
          });
          newUser.save((err) => {
            if (err) return done(err);
            return done(null, newUser);
          });
        } else {
          return done(null, user);
        }
      });
    },
    (req, done) => {
      // Logout verification callback
      done(null, true);
    }
  )
);

// Routes
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
