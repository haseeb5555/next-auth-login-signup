import mongoose from "mongoose";

  let isConnected=false

  export const connectToDB =async()=>{
      if(!process.env.MONGODB_URL){
          return console.log('url not found')
      }
    if(isConnected){
        return console.log('mongodb already connected')
    }
    try {
        mongoose.connect(process.env.MONGODB_URL)
        isConnected=true;
        console.log('mongodb is connected')
    } catch (error) {
        console.log(error)
    }
  }