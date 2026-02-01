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