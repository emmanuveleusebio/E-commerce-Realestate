import { NextRequest, NextResponse } from "next/server";
import products from '@/models/products'
import configDb from '@/config/dbConfig'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    }
})

async function uploadFileToS3(file, fileName) {
    const fileBuffer = file;
    const uniqueId = uuidv4();
    const s3Key = `myfolder/${uniqueId}_${fileName}`;

    const params = {
        Bucket: process.env.AWS_NAME,
        Key: s3Key,
        Body: fileBuffer,
        ContentType: file.type || 'image/jpg'
    };

    const command = new PutObjectCommand(params);

    try {
        const data = await s3Client.send(command);

        return s3Key;
    } catch (err) {
        console.error('Upload failed:', err);
        throw err;  // This will pass the error back to the POST function
    }
}



export async function POST(NextRequest) {
    try {



        const formdata = await NextRequest.formData()
        const file = formdata.get('file');
        if (!file) {

            return NextResponse.json({ status: 400 })
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const s3Key = await uploadFileToS3(buffer, file.name);




        configDb();
        const token = NextRequest.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json({ message: 'user not verified' })
        }
        let decodedToken
        try {
            const secretKey = process.env.SECRET_KEY
            decodedToken = jwt.verify(token, secretKey)

        } catch (error) {
            return NextResponse.json({ message: 'invalid token' }, { status: 401 })
        }
        const title = formdata.get('title');
        const description = formdata.get('description');
        const location = formdata.get('location');
        const price = formdata.get('price');
        const category = formdata.get('category');

        const createdProduct = await products.create({
            title,
            description,
            location,
            price,
            category,
            seller: decodedToken.id,
            image: s3Key,
        })



        return NextResponse.json({ message: 'data added successfully' })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'error while posting data from the backend' })
    }
}




export async function GET(NextRequest) {
    try {
        configDb();
        const { searchParams } = new URL(NextRequest.url);
        const category = searchParams.get('category');


        let data;
        if (category) {
            data = await products.find({ category });

        } else {
            data = await products.find();

        }

        // Construct the S3 URL for each product
        const bucketName = process.env.AWS_NAME;
        const s3BaseUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/`;

        const productsWithImages = data.map(product => {
            return {
                ...product.toObject(),  // Convert mongoose document to plain object
                imageUrl: s3BaseUrl + product.image // Append the S3 key to the base URL
            };
        });

        return NextResponse.json({ plots: productsWithImages }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'error while getting data', error: error }, { status: 401 });
    }
}