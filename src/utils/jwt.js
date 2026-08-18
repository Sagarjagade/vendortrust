import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

/**************************************************Generate Access Token and Refresh Token  ***********/
const generateAccessToken = (id) => {
    return jwt.sign({id},Process.env.JWT_ACCESS_SECRET,{
        expiresIn:"15m",
    })
}

const generateRefreshToken = ({id}) => {
    return jwt.sign({id},Process.env.JWT_REFRESH_SECRET,{
        expiresIn:"2d",
    })
}

/**************************************************End Generate Access Token and Refresh Token  ***********/


/************************************************** Verify Access Token and Refresh Token  ***********/
const verfiyAccessToken =  (req,res,next) => {
    try{
        let token = "";
        if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer")){
            token+=req.headers.authorization.split(" ")[1]
        }

        if(!token){
            return res.status(204).json({
                message:"Token not provided"
            })
        }

        const userInfo = jwt.verify(token,process.env.JWT_ACCESS_SECRET);
       
        req.user = userInfo;

        next();
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

const generateNewAccessToken = async (req,res) => {
    try{   
        // Get Refersh Token 
        let refresh_token = req.headers.refersh_token;
        if(!refersh_token){
            return res.status(401).json({
                status:false,
                message:"Refresh Token is required"
            })
        }

        //Verify Refersh Token
        const decode =jwt.verify(refresh_token,process.env.JWT_REFRESH_SECRET);

        //Match Refresh TOke  with DB
        const storedToken = await RefershToken.findOne({
            where:{
                userId:decode.id,
                token:refersh_token
            }
        })


        if(!storedToken){
            return res.status(401).json({
                 success:false,
                message:"refersh Token is already used or in valid"
            })           
        }

        //Generate New Access Token
        const newAccessToken =  generateAccessToken(decode.id)

        //genreate Refresh Token
        const newRefreshToken =  generateRefreshToken(decode.id)

        //Replace Rtotaion Token
        await RefershToken.update({
            token:newRefreshToken,
            expiresAt:new Date(Date.now()+2*24*60*60*1000)
        })

        //send new Token
        return res.status(200).json({
            status:true,
            accessToken:newAccessToken,
            refreshToken:newRefreshToken
        })

    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}



export {
    generateAccessToken,
    generateAccessToken,
    verfiyAccessToken,
    generateNewAccessToken
}