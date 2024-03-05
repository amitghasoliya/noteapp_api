const user = require("../models/user");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const noteModel = require("../models/note");
const SECRET_KEY = "NotesAPI"

const signup = async(req, res) =>{
    //check existing user
    //hashed password
    //user creation
    //token generate

    try{
        const {username, email, password} = req.body;
        console.log(username,email,password)
        
        const existingUser = await userModel.findOne({email:email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email:email,
            password: hashedPassword,
            username:username
        })

        const token = jwt.sign({email:result.email, id: result._id}, SECRET_KEY);
        res.status(201).json({user:result, token:token});

    }catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const signin = async (req, res) =>{
    const {email, password} = req.body;
    try{
        const existingUser = await userModel.findOne({email: email});
        if(!existingUser){
            return res.status(404).json({message: "User not found"});
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if(!matchPassword){
            return res.status(400).json({message: "Invalid Credentials"});
        }
        const token = jwt.sign({email:existingUser.email, id: existingUser._id}, SECRET_KEY);
        res.status(200).json({user: existingUser, token:token});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const deleteAccount = async(req,res) =>{
    try {
        const {id} = req.body;
        if(!id) {
            return res.status(400).json({
                success : false,
                message : "Id is not found"
            })
        }
       const user =  await userModel.findOne({
        _id : id
       })
      if(!user){
        return res.status(400).json({
            success : false,
            message : "User not found"
        })
      }
       const notes = await noteModel.find({
        userId: user._id
      });
    await Promise.all( notes.map(async(note) =>{
        await noteModel.findByIdAndDelete(note._id)
      }))

       await userModel.findByIdAndDelete(req.body.id);

        return res.status(200).json({
            success : true,
            message : "Your account has been deleted successfully."
            

        })

    }catch(e){
        return res.status(500).json({
            success : false,
            message : e.message
        })
    }
}

module.exports = { signup, signin,deleteAccount};