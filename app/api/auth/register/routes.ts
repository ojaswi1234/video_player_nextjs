import { connectDB } from "@/libs/db";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";

export default async function POST(request: NextRequest){
    try{
        const { email, password } = await request.json();
        if(!email || !password){
            return NextResponse.json(
                {
                    error: "Please provide email && password",
                    status: 400
                }
            )
        }
// CONNECTING TO THE DATABASE
       await connectDB();
// CHECKING IF THE USER IS ALREADY PRESENT OR NOT 
       const user = await User.findOne({email});
       if(user){
        return NextResponse.json(
            {
                error: "User already exists",
                status: 400
            }
        )
       }

// IF NOT PRESENT ALREADY, THEN CREATING NEW USER 
       const newUser = await User.create({email, password});


       return NextResponse.json(
        {
            message: "Registration successfull!!!",
            status: 200
        }
       )
    }catch(err){
        return NextResponse.json(
            {
                error: "Something went wrong",
                status: 500
            }
        )
    }
}