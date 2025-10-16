const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Passwordmodel } = require("../model/Password");




let Signup = async(req,res)=>{
     let {name,email,password} = req.body

     let existinguser = await Passwordmodel.findOne({email})
     if(existinguser){
      res.send({status:0,message:"user existed"})
     }
     else{
      const encryptpass = await bcrypt.hash(password,10);
      let user = new Passwordmodel({
        name,
        email,
        password,
        password:encryptpass
      })
     user.save()
     res.send({status:1,message:"done"})
     }
}

let Login = async(req,res)=>{
     let {email,password} = req.body;
     let checkemail = await Passwordmodel.findOne({email})
     if(!checkemail){
      res.send({message:"no user existed"})
     }

     const match = await bcrypt.compare(password,checkemail.password)
     
     if(!match){
            res.send({status:0,message:"password inccorect"})

     }

    
  const token = jwt.sign({ id: checkemail._id }, "secret123", { expiresIn: "1h" });
      res.status(200).json({
        status:1,
      message: "Login successful",
      token,
      user: {
        name: checkemail.name,
        email: checkemail.email
      }
    });
     

}
module.exports={Signup,Login}