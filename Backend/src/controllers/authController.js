const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Register Logic
async function registerController(req, res) {
  try {
    const { email, username, password, role } = req.body; 

    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserAlreadyExists) {
      return res.status(409).json({
        Message: "User already exists",
      });
    }

    
    const hashPass = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashPass,
      role: role || "user", 
    });

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    
    res.cookie("token", token, {
        httpOnly: true, 
        secure: false, 
    });

    res.status(201).json({
      Message: "User Registered successfully",
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Login Logic
async function loginController(req, res) {
  try {
    const { email, password } = req.body;


    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }


    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

  
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role, 
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
    });

    res.status(200).json({
      message: "User login successfully",
      user: {
        username: user.username,
        _id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Logout logic
async function logout(req, res){
    try {
        
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0), 
            sameSite: 'none',     
            secure: true          
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully! See you again."
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
  registerController,
  loginController,
  logout
};
