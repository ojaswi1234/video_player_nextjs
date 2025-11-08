import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;


if(!MONGODB_URI){
    throw new Error("MONGO_URI is not defined")
}


let cachedDB = global.mongoose


if(!cachedDB){
    cachedDB = global.mongoose =  {conn: null, promise: null}
}

export async function connectDB(){
    if(cachedDB.conn){
        return cachedDB.conn;
    }
    if(!cachedDB.promise){
        const opts ={
            bufferCommands: true,
            maxPoolSize: 10
        }
        mongoose.connect(MONGODB_URI!)
        .then(() => mongoose.connection)
    }
    
    try{
        cachedDB.conn = await cachedDB.promise
    }catch(err){
        cachedDB.promise = null;
        throw err;
    }
    return cachedDB.conn;
}