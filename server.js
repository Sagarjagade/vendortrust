import app from './app.js';
dotenv.config();
const PORT = Process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("Start Application");
})