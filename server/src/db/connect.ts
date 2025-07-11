import mongoose from 'mongoose';
async function connect(){
    const res = await mongoose.connect(process.env.MONGO_URI!)
    if(res) console.log("Connected to Level Up DB successfully");
}

export default connect;