const User = require("../models/user.model");

const registerController = async (req, res) => {
  try {
    const { username, email, fullName, phone, password } = req.body;
    const userExist = await User.findOne({ email });
    console.log(userExist);
    if (userExist) {
      return res.status(400).json({ msg: "Email already exist" });
    }
    const userCreated = await User.create({
      username,
      email,
      fullName,
      phone,
      password,
    });
    return res.status(201).json({ msg: "User register Sucessfully" });
    console.log(userCreated);
  } catch (error) {
    console.log(error);
    return res.status(400).json({msg: "Something is Missing"})
    
  }
};

module.exports = { registerController };
