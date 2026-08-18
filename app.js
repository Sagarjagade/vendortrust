import express from 'express';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

// app.use('/api',routes);

//404 handler
app.use((req,res)=>{
    res.status(404).json({
        success:false,
        message:"Page Not Found"
    })
})

//Gobal handler
app.use((err,req,res,next)=>{
    res.status(err.statusCode||500).json({
        success:false,
        message:err.message
    })
})

export default app;