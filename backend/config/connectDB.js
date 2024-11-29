const mongoose=require('mongoose')

const connectDB=async () => {
    try {
        const connect=await mongoose.connect(process.env.MONGO_URI)
        console.log(`mogodb connected:`);
        
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}


module.exports=connectDB;


// second method of another type 

// const start=async () => {
//     try {
//         await connectDB();
//         app.listen(PORT,()=>{
//             console.log(`server is running port :${PORT}`);
//         });
//     } catch (error) {
//         console.log(error);
        
//     }
    
// }
// start()