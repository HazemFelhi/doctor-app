/*
 * Copyright (c) 2022
 * @ author:  Abdorizak Abdalla aka (Xman)
 */
const { UserModel, validate } = require("../Model/User");
const bcrypt = require("bcrypt");
const express = require("express");
const Auth = require("../Middleware/Auth");
const router = express.Router();

// router.use(Auth)

router.get("/user", async (req, res) => {
  try {
    const allusers = await UserModel.find();
    res.send({
      status: 200,
      message: "Successfull",
      Users: allusers,
    });
  } catch (error) {
    res.send({
      status: 404,
      message: `Error: ${error}`,
    });
  }
});

router.post("/create-User", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const user = new UserModel(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hashSync(user.password, salt);
    await user.save();
    res.send({
      status: 200,
      message: `Successfully Registered`,
    });
  } catch (error) {
    res.send({
      status: 400,
      message: ` ${error}`,
    });
  }
});

router.put("/update-user/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const id = await UserModel.findById(req.params.id);
    if (!id) return res.status(400).send({ message: "ID was not found" });
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hashSync(req.body.password, salt);
    const updateUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        username: req.body.username,
        password: hashPass,
      },
      { new: true }
    );
    res.send({
      status: 200,
      message: "Successfully Updated",
      updateUser: updateUser,
    });
  } catch (error) {
    res.send({
      status: 400,
      message: `Error: ${error}`,
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deleteUser = await UserModel.findByIdAndDelete(req.params.id);
    res.send({
      status: 200,
      message: "Successfully Deleted",
    });
  } catch (error) {
    res.send({
      status: 400,
      message: `Error: ${error}`,
    });
  }
});

module.exports = router;