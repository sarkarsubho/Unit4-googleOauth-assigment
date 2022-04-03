
// role base asses controll

const authorise = (permittedroles)=>{

    return (req,res,next)=>{

        // console.log(permittedroles);
        // in the req authontication we attach the user
        let users=req.user;
        let ispermitted =false;

        permittedroles.map(roles=>{
        if(users.role.includes(roles)){
            ispermitted=true;
        }
        })
       if (ispermitted){
           next(); 
       }else{
           return res.status(401).send({message: "You are not authorize to perform this Operation only admin and seller can if you have those account please login with that."});

       }

       
    }

}

module.exports=authorise;

