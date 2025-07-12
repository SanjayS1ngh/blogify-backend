const UserModel=require("../models/user");
const bcrypt=require("bcrypt")
const SECRET_KEY = "BlogifySecretKey";
const jwt=require("jsonwebtoken")
async function handleUserSignup(req,res){
    console.log(req.body)
     const { username, password, email } = req.body; 
    const newUser=await UserModel.create({
        username:username,
        password:password,
        email:email
    })
    return res.json({msg:"signup successful"})

}
async function handleUserLogin(req,res){
    const { username, password, email } = req.body; 
    const user=await UserModel.findOne({email:email})
    if(!user){
        return res.status(404).json({err:"user not found"})
    }
    try{
        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(404).json({err:"invalid password"})
        }
        const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '1d' });
        return res.json({ msg: "Login successful", token: token, username: user.username });

    }catch(error){
        throw error;
    }
}
module.exports={
    handleUserSignup,
    handleUserLogin
}