import mongoose from 'mongoose';

let isConnected =false;

export const connectToDB = async () => {
    mongoose.set('strictQuery',true);
    if (isConnected){
        console.log('mongo è connsso')
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbNAme:"Share_prompt",
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        isConnected=true;
        console.log('mongodb è connesso')
    } catch(error){
        console.log(error);

    }
}