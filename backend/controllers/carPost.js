const carPost = require('../models/carPost');
const fs = require('fs');
const path = require('path');

//create a post
exports.createCarPost = async (req, res) => {
    try {
        const { user, title, model, year, engine, fuel, km, transmission, description, price, dispo } = req.body;
        const newCarPost = new carPost({
            user : user, 
            title : title, 
            model : model, 
            year : year, 
            engine : engine, 
            fuel : fuel, 
            km : km, 
            transmission : transmission, 
            description : description, 
            price : price, 
            dispo : dispo,
        });

        await newCarPost.save();
        res.status(201).json({ Success: "Post successfully added" , carPost : newCarPost});
    } catch (err) {
        console.log(err);
        res.status(500).json({ InternalServerError: 'Unable to create a new post' });
    }
};

//get all the posts
exports.getCarPosts = async (req, res) => {
    try {
        const carPosts = await carPost.find({}).populate('user');
        
        if(!carPosts){
            return res.status(404).json({ NotFound: 'No car post found !' });
        }else{
            res.status(200).json(carPosts);
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ InternalServerError: 'Unable to get posts' });
    }
};

//get the post by user id
exports.getCarPostsByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const userCarPosts = await carPost.find({ user: userId }).populate('user');

        if (userCarPosts.length === 0) {
            return res.status(404).json({ NotFound: 'No posts found for this user' });
        }

        res.status(200).json(userCarPosts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ InternalServerError: 'Unable to fetch posts' });
    }
};

//update the post
exports.updateCarPost = async (req, res) => {
    try {
        const post = await carPost.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ NotFound: 'Post not found' });
        }
        var updates = req.body ;
        if (req.file) {
            if (post.photos) {
                const photosPath = path.join(process.env.IMAGES_DESTINATION, post.photos);
                fs.unlinkSync(photosPath);
            }
            updates.photos = req.file.filename
        }
        
        const updatedCarPost = await carPost.findByIdAndUpdate(req.params.id, updates, { new: true });

        if (!updatedCarPost) {
            return res.status(400).json({ NotFound: "Could not update the car post" });
        }

        res.status(200).json({ Success: 'Post updated successfully', carPost : updatedCarPost });
    } catch (err) {
        console.log(err);
        res.status(500).json({ InternalServerError: 'Unable to update the post' });
    }
};

//delete the post
exports.deleteCarPost = async (req, res) => {
    try {
        const post = await carPost.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ NotFound: 'Post not found' });
        }
        if (post.photos) {
            const photosPath = path.join(process.env.IMAGES_DESTINATION, post.photos);
            fs.unlinkSync(photosPath);
        }
        if ((await carPost.deleteOne({_id : req.params.id})).deletedCount !== 0 ) {
            res.status(200).json({ Success: 'Post deleted successfully'});
        }else{
            res.status(422).json({ error: "Could not delete the car post !"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ InternalServerError: 'Unable to delete post' });
    }
};
