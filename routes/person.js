const express = require("express");
const personRouter = express.Router();
const Person = require("../models/person")


personRouter.post("/", async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    let result = await newPerson.save();
    res.status(200).send({ result: result, msg: "user added" });
  } catch (error) {
    res.status(400).send({msg: "can't add user"})
  }
});

personRouter.get("/", async (req, res) => {
  try {
    let result = await Person.find();
    res.status(200).send({ persons: result, msg: " list all users" });
  } catch (error) {
    res.status(400).send({msg: "error"})
  }
});

personRouter.get("/:id", async (req, res) => {
  try {
    const result = await Person.findOne({ _id: req.params.id });
    res.status(200).send({ persons: result, msg: "user found" });
  } catch (error) {
    res.status(400).send({msg : "can't find"})
  }
});

personRouter.put("/:id", async (req, res) => {
  try {
    let result = await Person.findOneAndUpdate({
      _id: req.params.id,
      $set: { ...req.body },
    });
    res.status(200).send({ newUser: result, msg: "updated" });
  } catch (error) {
    res.status(400).send({msg : "can't update"})
  }
});

personRouter.delete("/:id", async (req, res) => {
  try {
    let result = await Person.findOneAndRemove({
      _id: req.params.id,
    });
    res.status(200).send({ msg: "deleted" });
  } catch (error) {
  res.status(400).send ({msg : "can't delete"})
  }
});

 personRouter.post("/:favFood " , async (req, res) => {
  try {
    const { favFood } = req.params;
    const burritos = await Person.find({
      favFood: "burritos",
    })
      .sort({ name: "asc" })
      .limit(2)
      .select("-age")
      .exec(error, data);
    res.send({ msg: "this is who like burritos", peopleFood });
  } catch (error) {
    res.status(400).send({ msg: "looks like no one likes burritos" });
  }
});
module.exports = personRouter;
