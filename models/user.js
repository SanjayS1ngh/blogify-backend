const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const userSchema=mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        }

    },{timestamps:true}
)

userSchema.pre('save', async function (next) {
    const user=this
    if (!user.isModified('password')){
    return next()
 }
 try{
    const saltRounds=10;
    const hashPassword=await bcrypt.hash(user.password,saltRounds);
    user.password=hashPassword;
    return next()
 }
 catch(error){
    return next(error)
 }

}
);

const UserModel=mongoose.model("UserModel",userSchema);
module.exports = UserModel;

