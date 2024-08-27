import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import mongoose from 'mongoose';
import User from "../../../models/user"
import Connect from '../../../config/dbConfig'
import jwt from 'jsonwebtoken'


const razorpay = new Razorpay({
    key_id: process.env.RAZOR_KEY_ID,
    key_secret: process.env.RAZOR_KEY_SECRET,
})

export async function POST(NextRequest) {
    try {
       
       
        const order = await razorpay.orders.create({
            amount: 100 * 100,
            currency: 'INR',
            receipt: 'receipt_' + Math.random().toString(36).substring(7),
        })
       

       
        return NextResponse.json({ message: 'order create successfully' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 })

    }
}


export async function PUT(NextRequest){
    try {
       
         const data = await NextRequest.json()
       
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + data.duration);


         Connect()
        const token = NextRequest.cookies.get('token')?.value;
        
        if (!token) {
            return NextResponse.json({ message: 'user not verified' }, { status: 404 })
        }
        let decodedToken;
        try {
            const secretKey = process.env.SECRET_KEY
            decodedToken = jwt.verify(token, secretKey)
            console.log(decodedToken.id, 'this is the de')
        } catch (error) {
            return NextResponse.json({ message: 'invalid token' }, { status: 404 })
        }
        
        const updatedUser = await User.findByIdAndUpdate(
            decodedToken.id,                                                                                          
            {
                role: 'premium',
                'premiumMembership.type': data.name,
                'premiumMembership.startDate': startDate,
                'premiumMembership.endDate': endDate,
                updatedAt: new Date(),
            },
            { new: true } // To return the updated document
        );
        if (!updatedUser) {
            return new Response(JSON.stringify({ error: 'User not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        return NextResponse.json({ message: 'user updated succesfully' }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 })
    }
}