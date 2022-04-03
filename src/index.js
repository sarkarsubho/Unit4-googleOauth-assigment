const express=require("express");

const connect=require("./configs/db");
const userController=require("./controllers/user.controllers");
const {register,login,generatetoken}=require("./controllers/auth.controllers")

const productController=require("./controllers/product.controllers");

const passport=require("./configs/google.oauth");

const app =express();

app.use(express.json());


app.use("/users",userController);
app.post("/register",register);
app.post("/login",login);

app.use("/products",productController);

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email']}));



 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' ,session:false}),
  function(req, res) {
    // Successful authentication, redirect home.

    const token=generatetoken(req.user);
    res.status(200).send({user:req.user,token});


  });




app.listen(5678, async ()=>{
    try{
        await connect();
        console.log("listning on port 5678");
    }catch(err){
        console.log(err.message);
    }
  
})
