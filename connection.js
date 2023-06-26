import mongoose from 'mongoose'


const db = async () =>{
    const URL =process.env.MONGO_URI;
console.log(URL)
    try {
    const dbConnect = await mongoose.connect(URL)    
    console.log('Server connected to Database successfully...')
        } 
    catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}
export default db