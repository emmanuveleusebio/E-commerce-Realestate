import { S3Client } from '@aws-sdk/client-s3';

// Create an S3 client instance with the appropriate configuration
const s3 = new S3Client({
    region:  process.env.AWS_REGION_R,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_R,
        secretAccessKey: process.env.SECRET_KEY_R,
    }
});

export default s3;
