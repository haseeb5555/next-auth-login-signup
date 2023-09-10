"use server"

import { User } from "../models/UserSchema";
import { connectToDB } from "../models/connection"


export async function fetchUser({email}:{email:string}){

    try {
        
        await connectToDB();
     const res=   await User.findOne({email})
     return res
    } catch (error:any) {
       console.log(error)  
    }
}