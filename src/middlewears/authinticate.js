require('dotenv').config();

const jwt=require("jsonwebtoken");

const verifyToken=(token)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=> {
            if(err)return reject(err)


            return resolve (decoded)
          });
           
    })
}



const authenticate=async (req,res,next)=>{
    //cheaking if there is inthe headers are any berrer token or not
   if(!req.headers.authorization)
   return res.status(400).send({message:"Authorization token not found or incorrect 1"});

   if(!req.headers.authorization.startsWith("Bearer "))
   return res.status(400).send({message:"Authorization token not found or incorrect 2" });

   // collecting the token from the brrere token
   const token =req.headers.authorization.trim().split(" ")[1];

    // can anybody give any token so we veryfy the token

   let decoded;
   try{
        decoded = await verifyToken(token);
        console.log(decoded);
   }catch(err){
    console.log(err);

    return res.status(400).send({message:"Authorization token not found or incorrect 3"});
   }
//    console.log("here is the decode")
  

   req.user= decoded.user;

   return next();
}



module.exports = authenticate;