const mongoose =require("mongoose");
const bcrypt = require('bcrypt');


const userSchema=mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:[{type:String}]
},{
    timestamps:true,
    versionKey:false,

});

// console.log(this.password);

userSchema.pre("save",function(next){
                                //(schema password,how many round)
    const hash = bcrypt.hashSync(this.password,8);

       
    this.password=hash;
    return next();
});

userSchema.methods.checkPassword=function(password){
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model("user",userSchema);

module.exports =User