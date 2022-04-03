

const User=require("../models/user.model");

const jwt = require('jsonwebtoken');
require('dotenv').config();

const generatetoken =(user)=>{ 
  return  jwt.sign({user},process.env.SECRET_KEY)
};



const register=async (req,res)=>{
    try{
        let myuser= await User.findOne({email: req.body.email});
        

        if(myuser){
            return res.status(400).send({message:"Email Already Exists Pleasae try Another"})
        };

        //if it is a new user,creat it and allow to register.
         myuser =await User.create(req.body);
        //  console.log(myuser);

         const token=generatetoken(myuser);
        //  console.log(token);
        return res.status(200).send({myuser,token});
    }catch(err){
        res.status(400).send({message:err.message})
    }
};


const login = async (req,res)=>{

    try{
        let loguser= await User.findOne({email: req.body.email});
        

        if(!loguser){
            return res.status(400).send({message:"Wrong email or password 1"})
        }

        //if the email exicets cheak password
       const match =loguser.checkPassword(req.body.password);

       if(!match){
        return res.status(400).send({message:"Wrong email or password"})
       }

       //if it is matchs
       const token=generatetoken(loguser);
        return res.status(200).send({loguser,token});


    }catch(err){
        res.status(400).send({message:err.message})
    }
};

module.exports={register,login,generatetoken}