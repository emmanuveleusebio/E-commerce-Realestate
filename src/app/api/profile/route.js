import { NextResponse } from "next/server";
import Connect from '../../../config/dbConfig'
import posts from '../../../models/products'
import jwt from "jsonwebtoken";


export async function GET(request) {
    try {
       
        await Connect()

        const token = request.cookies.get('token')?.value
       
        if (!token) {
            NextResponse.json({ message: 'user is not verified' }, { status: 404 })
        }
        let decodedToken;
        try {
            const secretKey = process.env.SECRET_KEY
            decodedToken = jwt.verify(token, secretKey)
        } catch (error) {
            return NextResponse.json({ message: 'token is not valit' }, { status: 404 })
        }
        const data = await posts.find({ seller: decodedToken.id })

        const bucketName = process.env.AWS_NAME;
        const s3BaseUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/`;
        const productsWithImages = data.map(product => {
            return {
                ...product.toObject(),  // Convert mongoose document to plain object
                imageUrl: s3BaseUrl + product.image // Append the S3 key to the base URL
            };
        });
        
        return NextResponse.json({ message: productsWithImages }, { status: 200 })
    } catch (error) {
        return NextResponse({ error: error.message }, { status: 500 })
    }
}