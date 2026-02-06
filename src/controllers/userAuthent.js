const redisClient = require("../config/redis")
const User = require("../models/user")
const validate = require("../utils/validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



const register = async (req, res) => {

  try {
    //validate the data
    validate(req.body);

    const { firstname, emailId, password } = req.body;
    req.body.password = await bcrypt.hash(password, 10)


    const user = await User.create(req.body);
    const token = jwt.sign({ _id: user._id, emailId: emailId }, process.env.JWT_KEY, { expiresIn: 60 * 60 })
    res.cookie('token', token, { maxAge: 60 * 60 * 1000 });
    res.status(201).send("User Registered Successfully");

  }
  catch (err) {
    res.status(400).send("Error: " + err)
  }

}

const login = async (req, res) => {

  try {
    const { emailId, password } = req.body;

    if (!emailId)
      throw new Error("Invalide Credentials")

    if (!password)
      throw new Error("Invalide Credentials")

    const user = await User.findOne({ emailId })
    const match = bcrypt.compare(password, user.password)

    if (!match)
      throw new Error("Invalide Credentials")

    const token = jwt.sign({ _id: user._id, emailId: emailId }, process.env.JWT_KEY, { expiresIn: 60 * 60 })
    res.cookie('token', token, { maxAge: 60 * 60 * 1000 })
    res.status(200).send("Logged In Successfully")
  }
  catch (err) {
    res.status(401).send("Error: " + err)
  }

}


const logout = async (req, res) => {

  try {
    const { token } = req.cookies;
    const payload = jwt.decode(token);

    await redisClient.set(`token:${token}`, 'Blocked');
    await redisClient.expireAt(`token:${token}`, payload.exp);

    res.cookie("token", null, { expries: new Date(Date.now()) });
    res.send("Logged Out Successfully")
  }
  catch (err) {
    res.status(503).send("Error: " + err)
  }

}


const adminRegister = async (req, res) => {

  try {

    validate(req.body);
    const { firstname, emailId, password } = req.body;

    req.body.password = await bcrypt.hash(password, 10);

    const user = await User.create(req.body)
    const token = jwt.sign({ _id: user._id, emailId: emailId, role: user.role }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
    res.cookie('token', token, { maxAge: 60 * 60 * 1000 });
    res.status(201).send("Admin Registered Successfully")

  }
  catch (err) {
    res.Status(400).send("Error: " + err)
  }

}



module.exports = { register, login, logout, adminRegister }