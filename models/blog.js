const mongoose=require("mongoose");

const Schema=mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        },
        coverImage: {
    type: String,
    required: false, // It's not required for now
    },
    author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true
  }

    },{timestamps:true}
)
const Blog=mongoose.model("Blog",Schema);

module.exports =Blog;