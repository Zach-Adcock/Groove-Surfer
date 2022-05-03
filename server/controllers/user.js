import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async(req, res) => {
  const { email, password } = req.body;

  try {
    //Check that user exist and password is correct
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({message: "User not found."})
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) return res.status(400).json({message: "Invalid email/password combination."})

    //create token to send to front end
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h"})
    
    res.status(200).json({ result: existingUser, token})
  } catch (err) {
    res.status(500).json({ message: 'Sorry, something is wrong.'})
  }
}


export const signup = async(req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

 try {
  //is email already being used?
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(404).json({message: "User already exists with this email."});

  if (password !== confirmPassword) return res.status(400).json({message: "Passwords don't match"});

  const hashedPassword = await bcrypt.hash(password, 12);

  const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`})

  const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h"});
  res.status(200).json({ result, token});

 } catch (err) {
  res.status(500).json({ message: 'Sorry, something is wrong.'})
 }
}