const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
const multer = require("../middlewares/multer");

//Create user
router.post('/', user.signup);

//Login
router.post('/login', user.login);

//Get users
router.get('/', user.getUsers);

//Find user by id
router.get('/:id',user.getUserById);

//Update user
router.put('/:id', multer.upload.single('avatar'),user.updateUserById);

//Delete user
router.delete('/delete/:id',user.deleteUserById);

module.exports = router;
