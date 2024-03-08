import axios from "axios";

//Login
export const signin = (cred, callback) => {
  axios
    .post(`${process.env.REACT_APP_USERS_URL}/login`, cred)
    .then((res) => callback(res))
    .catch((err) => callback(err));
};

//signup
export const signup = (user, callback) => {
  axios
    .post(`${process.env.REACT_APP_USERS_URL}`, user)
    .then((res) => callback(res))
    .catch((err) => callback(err));
};

//get all users
export const getUsers = (callback) => {
  axios
    .get(`${process.env.REACT_APP_USERS_URL}`)
    .then((res) => callback(res))
    .catch((err) => callback(err));
};

//get user by id
export const getUserById = (id, callback) => {
  axios
    .get(`${process.env.REACT_APP_USERS_URL}/${id}`)
    .then((res) => callback(res))
    .catch((err) => callback(err));
};

//update user by id
export const updateUserById = (id,user,callback)=>{
  axios
  .put(`${process.env.REACT_APP_USERS_URL}/${id}`,user)
  .then((res) => callback(res))
  .catch((err) => callback(err));
}
//delete user by id
export const deleteUserById = (id, callback) => {
  axios
    .delete(`${process.env.REACT_APP_USERS_URL}/delete/${id}`)
    .then((res) => callback(res))
    .catch((err) => callback(err));
};
