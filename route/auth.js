const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../model/admin");
const keys = require("../config/keys");

router.post("/check", (req, res) => {
  const { Email, Password } = req.body;
  console.log(Email, Password);
  Admin.findOne({ Email })
    .then((user1) => {
      if (!user1) {
        res.json({ msg: "User does not exist", value: 1 });
      } else {
        bcrypt.compare(Password, user1.Password).then((isMatch) => {
          if (!isMatch) {
            res.json({ msg: "Invalid password", value: 2 });
          } else {
            jwt.sign({ id: user1._id }, keys.jwtKey, (err, token) => {
              if (err) throw err;
              res.json({
                token,
                value: 3,
                user1: {
                  id: user1._id,
                  email: user1.Email,
                },
              });
            });
          }
        });
      }
    })
    .catch((err) => {
      throw err;
    });
});

router.post("/add", (req, res) => {
  const { Email, Password } = req.body;
  if (!Email || !Password)
    return res.status(400).send("Send valid credentials..");
  Admin.findOne({ Email }).then((user) => {
    if (user) {
      res.send("Already exist");
    } else {
      const newAdmin = new Admin({
        Email,
        Password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.Password, salt, (err, hash) => {
          if (err) throw err;
          newAdmin.Password = hash;
          newAdmin
            .save()
            .then((data) => {
              console.log("user registered..");
              res.json({ user: data });
            })
            .catch((err) => {
              throw err;
            });
        });
      });
    }
  });
});

module.exports = router;
