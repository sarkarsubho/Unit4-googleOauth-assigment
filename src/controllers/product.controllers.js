const express=require("express");
const router =express.Router();

const product= require("../models/product.model");

const authenticate=require("../middlewears/authinticate");

const authorise=require("../middlewears/authorise");




router.post("",authenticate,async (req,res)=>{
    req.body.user_id =req.user;
    try{
        const products= await product.create(req.body);

        return res.status(200).send({products:products});

    }catch(err){
        res.status(500).send({message:err.message})
    }


});
router.get("",async (req,res)=>{
    
    try{
        const products= await product.find().lean().exec();

        return res.status(200).send({products:products});

    }catch(err){
        res.status(500).send({message:err.message})
    }


});

router.patch("/:id",authenticate,authorise(["admin","seller"]),async (req,res)=>{
    // req.body.user_id =req.userID;
    try{
        const products= await product.findByIdAndUpdate(req.params.id,req.body,{new:true});

        return res.status(200).send(products);

    }catch(err){
        res.status(500).send({message:err.message})
    }


});

module.exports=router;