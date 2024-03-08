const express = require("express");
const router = express.Router();
const carPost = require("../controllers/carPost");
const multer = require("../middlewares/multer");


//Create a post
router.post('/', multer.upload.single('photos'), carPost.createCarPost);

//Get posts
router.get('/', carPost.getCarPosts);

//Get posts by user
router.get('/:id', carPost.getCarPostsByUserId);

//Update post
router.put('/:id', multer.upload.single('photos'), carPost.updateCarPost);

//Delete post
router.delete('/:id', carPost.deleteCarPost);

module.exports = router;