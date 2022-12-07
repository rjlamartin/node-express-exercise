import express from "express";
import db from "../mockdb";

const router = express.Router();

// Requests will reach these routes already matching /api/users

//Read user data
//If an id url parameter is provide, get one user
//Else get all users
router.get("/:id?", async (req, res, next) => {
  try {
    //get user data and respond
    let { id } = req.params;
    let data;

    if (id) {
      //get one user
      data = await db.getOne(id);
    } else {
      //get all users
      data = await db.getAll();
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
});

//Create a new user
//New user data is sent with request body
router.post("/", async (req, res, next) => {
  try {
    //create user data and respond
    let newUser = req.body;
    let data = await db.add(newUser);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

//Update an existing user
//Updated user data is sent with request body
//User to be update is id url prarmeter
router.put("/:id", async (req, res, next) => {
  try {
    //update user data and respond
    let { id } = req.params;
    let updatedUser = req.body;
    let data = await db.update(id, updatedUser);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

//Delete an existing user
//User to be deleted is id url parameter
router.delete("/:id", async (req, res, next) => {
  try {
    //delete user data and respond
    let { id } = req.params;
    let data = await db.remove(id);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router; 
