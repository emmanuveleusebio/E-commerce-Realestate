import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        const data = await request.json();
        console.log(data)
       return NextResponse.json({data})
    } catch (error) {
        console.log(error)
    }
}