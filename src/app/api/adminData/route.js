import { NextResponse } from "next/server";
import Users from '../../../models/user'
import mongoose from "mongoose";
import Connect from '../../../config/dbConfig'


export async function GET(){
    try {
        await Connect()
        const customers = await Users.find()
        const users = customers.filter((user) => user.role != 'admin')
        return NextResponse.json({data: users}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: 'internal server error',error}, {status: 500})
    }
}