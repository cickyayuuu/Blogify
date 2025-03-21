import express from 'express'
const app = express();
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import userRoute from "./routes/user.route.js"
import blogRoute from "./routes/blog.route.js"
import fileUpload from 'express-fileupload'; // for image 
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from "bcryptjs";
import cors from "cors";
import cookieParser from 'cookie-parser';

dotenv.config();
app.use(cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"],// Allows sending cookies
  }));

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URI;

//middlewares
app.use(express.json());
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir:"/tmp/"
}))
// console.log(MONGO_URL)

//DB Connect 
try{
mongoose.connect(MONGO_URL);
console.log("Connected to MongoDb")
}catch(err){
    console.log(err)
}


// defining routes 
app.use("/api/users", userRoute)
app.use("/api/blogs", blogRoute)

//Cloudinary Connected

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_SECERT_KEY // Click 'View API Keys' above to copy your API secret
});

app.get('/',(req,res)=>{
res.send("Hello vicky 4 blog app")
})



app.listen(PORT, ()=>{
    console.log(`listining at the port number${PORT}`)
})