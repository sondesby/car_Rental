import axios from "axios";

    

//Fetch carPosts 
export const getAllCarPosts = (callback) => {
    axios.get(`${process.env.REACT_APP_CARPOST_URL}`)
        .then((res) => callback(res))
}

//Fetch user carPosts 
export const getAllUserCarPosts = (userId, callback) => {
    axios.get(`${process.env.REACT_APP_CARPOST_URL}/${userId}`)
        .then((res) => callback(res))
        .catch((err) => callback(err));
}

//Add carPosts
export const addCarPost = (carPost, callback) => {
    axios.post(`${process.env.REACT_APP_CARPOST_URL}`, carPost)
        .then((res) => callback(res))
        .catch((err) => callback(err));
}

//Update carPosts
export const updateCarPost = (id, carPost, callback) => {
    axios.put(`${process.env.REACT_APP_CARPOST_URL}/${id}`, carPost)
        .then((message) => callback(message))
        .catch((err) => callback(err));
}

//Delete carPosts
export const deleteCarPost = (id, callback) => {
    axios.delete(`${process.env.REACT_APP_CARPOST_URL}/${id}`)
        .then((res) => callback(res))
        .catch((err) => callback(err));
}
