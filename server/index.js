import express, { json } from "express"
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import recruiterRouter from "./routes/recruiter.route.js";
import applicantRouter from "./routes/applicant.router.js";
import cookieParser from "cookie-parser";
import cors from "cors"




const app = express();
const port = process.env.PORT || 8000;
dotenv.config();
connectDB();


app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: "https://job-connect-ten-tau.vercel.app", // frontend url
    credentials: true, //allow cookies to be sent
}));
app.use('/api/auth' , authRouter)
app.use('/api/recruiter' , recruiterRouter)
app.use('/api/applicant' , applicantRouter)


app.get('/' , (req,res) => {
    res.send("Hello World!");
})
app.post('/test', (req, res) => res.send("OK"));

app.listen(port , () =>{
    console.log(`Server is running on http://localhost:${port}`);
})