require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const fs = require("fs");
const path = require("path");

//Register
exports.signup = async (req, res) => {
  try {
    const data = req.body;
    await bcrypt.hash(data.password, 10).then((hash) => {
      const newUser = new User({ ...data, password: hash });
      newUser
        .save()
        .then((savedUser) => {
          var userLogged = { name: savedUser.name, _id: savedUser._id };
          res.status(201).json({
            Success: "User successfully added ",
            userLogged,
            // accessToken: jwt.sign(
            //   { user: savedUser },
            //   process.env.ACCESS_TOKEN_SECRET,
            //   { expiresIn: "30m" }
            // ),
            Token: jwt.sign({ user: savedUser }, process.env.TOKEN_SECRET, {
              expiresIn: "24d",
            }),
          });
        })
        .catch((err) => {
          if (err.code === 11000) {
            if (err.keyPattern.cin === 1) {
              return res
                .status(400)
                .json({ duplicated: "The CIN is already in use !" });
            }
            if (err.keyPattern.email === 1) {
              return res
                .status(400)
                .json({ duplicated: "The email is already in use !" });
            }
            if (err.keyPattern.phone === 1) {
              return res
                .status(400)
                .json({ duplicated: "The phone number is already in use !" });
            }
          } else {
            return res.status(400).json({ InternalServerError: err.message });
          }
          return res.status(500).json({ InternalServerError: err });
        });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ InternalServerError: err });
  }
};

//login
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({ Error: "Invalid credentials" });
    } else {
      var userLogged = { name: user.name, _id: user._id, role: user.role };
      if (user.avatar !== undefined) {
        userLogged.avatar = user.avatar;
      }
      res.status(200).json({
        Success: "Login successful",
        userLogged: userLogged,
        // accessToken: jwt.sign(
        //   { user: userLogged },
        //   process.env.ACCESS_TOKEN_SECRET,
        //   { expiresIn: "30m" }
        // ),
        Token: jwt.sign({ user: userLogged }, process.env.TOKEN_SECRET, {
          expiresIn: "24h",
        }),
      });
    }
  } catch (err) {
    return res.status(500).json({ InternalServerError: "Login failed" });
  }
};

//Fetch users
exports.getUsers = async (req, res) => {
  try {
    User.find().then((users) => {
      res.status(200).json({ users: users });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ InternalServerError: "Unable to fetch users" });
  }
};

//Fetch user by id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ NotFoundError: "User not found" });
    } else return res.status(200).json({ user: user });
  } catch (err) {
    res.status(500).json({ InternalServerError: "Unable to fetch user" });
  }
};

//Update a user
exports.updateUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ NotFoundError: "User not found" });
    }
    var updates = req.body;
    const oldAvatar = user.avatar;

    if (req.file) {
      if (oldAvatar) {
        const oldPath = path.join(process.env.IMAGES_DESTINATION, oldAvatar);
        fs.unlinkSync(oldPath);
      }
      updates.avatar = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(400).json({ NotFoundError: "Could not update" });
    }

    res
      .status(200)
      .json({ Success: "User updated successfully", user: updatedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ InternalServerError: "Unable to update user" });
  }
};

//Delete a user
exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.avatar) {
      const avatarPath = path.join(process.env.IMAGES_DESTINATION, user.avatar);
      fs.unlinkSync(avatarPath);
    }

    if ((await User.deleteOne(user)).deletedCount !== 0) {
      return res.status(200).json({ message: "User successfully deleted !" });
    } else {
      return res.status(400).json({ error: "Couldn't delete user !" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
