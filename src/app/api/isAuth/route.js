import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

const secretKey = process.env.SECRET_KEY_R

export async function GET(NextRequest) {
    try {
        const token = NextRequest.cookies.get('token');
        if (!token) {
            return NextResponse.json({ message: 'token not found' }, { status: 401 })
        }
        jwt.verify(token.value, secretKey)
        return NextResponse.json({ message: 'token verified successfully' }, { status: 200 })

    } catch (error) {
        console.log('token verification failed', error)
        return NextResponse.json({ message: 'invailid token' }, { status: 401 })
    }
}