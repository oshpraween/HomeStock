const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ fullName, email, password: hashedPassword});

  await newUser.save().then(() => {
    res.status(201).json({ message: "User created successfully" });
  }).catch((error) => {
    res.status(500).json({ message: "User creation failed", error: error.message });
  });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.status(200).json({ token, role: user.role ,id:user._id});
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

exports.getMyUser=async(req,res)=>{

  const userId = req.params.id; 
  try {
    const user = await User.findById(userId).select("-password"); // Exclude password
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }   
}


exports.deleteUser=async(req,res)=>{   
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
}
exports.updateUser=async(req,res)=>{   
  const { id } = req.params;
  const { fullName, email, password ,nickName,gender,country,profilePic,contactNo,occupation} = req.body;
  
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.nickName = nickName || user.nickName;
    user.gender = gender || user.gender;
    user.country = country || user.country;
    user.profilePic = profilePic || user.profilePic;
    user.contactNo = contactNo || user.contactNo;
    user.occupation = occupation || user.occupation;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
}
