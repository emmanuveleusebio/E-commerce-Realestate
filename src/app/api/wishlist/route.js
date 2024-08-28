import { NextRequest, NextResponse } from "next/server";
import Wishlist from '@/models/wishlist';
import Connect from '@/config/dbConfig'
import products from '@/models/products'
import jwt from 'jsonwebtoken'


export async function GET(NextRequest) {
    try {
        Connect()
        const token = NextRequest.cookies.get('token')?.value
        if (!token) {
            NextResponse.json({ message: 'user is not verified' }, { status: 404 })
        }
        let decodedToken;
        try {
            const secretKey = process.env.SECRET_KEY-r
            decodedToken = jwt.verify(token, secretKey)
        } catch (error) {
            return NextResponse.json({ message: 'token is not valit' }, { status: 404 })
        }
        const user = await Wishlist.findOne({ userId: decodedToken.id });
        if (!user) {
            return NextResponse.json({ message: 'wishlist is empty' })
        }
        const productList = await products.find({ _id: { $in: user.properties } })
        console.log(productList, 'this is the productsssss')



        // Construct the S3 URL for each product
        const bucketName = process.env.AWS_NAME-r;
        const s3BaseUrl = `https://${bucketName}.s3.${process.env.AWS_REGION-r}.amazonaws.com/`;

        const productsWithImages = productList.map(product => {
            return {
                ...product.toObject(),  // Convert mongoose document to plain object
                imageUrl: s3BaseUrl + product.image // Append the S3 key to the base URL
            };
        });

        return NextResponse.json({ productsWithImages }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: 400 })
    }
}

export async function POST(NextRequest) {
    try {
        const token = NextRequest.cookies.get('token')?.value;
        if (!token) {
            return NextResponse.json({ message: 'user not verified' }, { status: 404 })
        }
        let decodedToken;
        try {
            const secretKey = process.env.SECRET_KEY-r
            decodedToken = jwt.verify(token, secretKey)
        } catch (error) {
            return NextResponse.json({ message: 'invalid token' }, { status: 404 })
        }

        const { details } = await NextRequest.json();
        const userWishlist = await Wishlist.findOne({ userId: decodedToken.id });
        if (userWishlist) {
            const productIndex = userWishlist.properties.indexOf(details)
            if (productIndex != -1) {
                userWishlist.properties.splice(productIndex, 1);
                const newData = await userWishlist.save();
                const updatedWishlist = await products.find({ _id: { $in: newData.properties } });
                console.log(updatedWishlist, 'aaaa')
                return NextResponse.json({ data: updatedWishlist }, { status: 201 });
            }
            userWishlist.properties.push(details)
            const newData = await userWishlist.save();
            const updatedWishlist = await products.find({ _id: { $in: newData.properties } });
            console.log(updatedWishlist, 'bbbb')
            return NextResponse.json({ data: updatedWishlist }, { status: 200 })
        }
        else {
            const newData = await Wishlist.create({
                userId: decodedToken.id,
                properties: [details],
            })
            const updatedWishlist = await products.find({ _id: { $in: newData.properties } });
            console.log(updatedWishlist, 'cccc')
            return NextResponse.json({ data: updatedWishlist }, { status: 200 })
        }


    } catch (error) {
        console.log(error, 'error while posting data')
        return NextResponse.json({ message: 'error while adding to wishlist' }, { status: 400 })
    }
}
