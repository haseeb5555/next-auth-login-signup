import mongoose from 'mongoose'


const usersSchema = new mongoose.Schema({
    name: String,
    email:String,
    password:String
},
{
    timestamps:true
}


)

export const User= mongoose.models.User||mongoose.model("User",usersSchema)
