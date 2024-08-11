import mongoose from 'mongoose';

const Connect = async () => {
    try {
        const config = await mongoose.connect(process.env.MONGO_CONNECT);
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default Connect;
