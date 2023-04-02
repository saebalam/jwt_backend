const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken')

const PORT = 5000;
const secretKey = "ro8BS6Hiivgzy8Xuu09JDjlNLnSLldY5";

//user id password that will be stored in database
const name = 'Test user'
const email='test'
const password = 'password'

app.use(cors());
app.use(bodyParser.json());

const verifyToken =(req,res,next)=> {
    const token = req.headers['token']

    if(!token){
        res.send('We need a token, Pplease provide us next time')
    }
    else{
        jwt.verify(token,secretKey,(err,decode)=>{
            if(err){
                res.json({status:false,message:'You failed to authenticate'})
            }else{
                next()
            }
        })
    }
}

app.post("/login", (req, res) => {
    const reqPayload = {email:req.body.email,password:req.body.password}
    // req.session.user={reqPayload}
    if(req.body.email == email && req.body.password == password){
        const token = jwt.sign(reqPayload,secretKey)
        console.log('token',token)
        res.send({ loggedin: true, message: "Successfully logged in",data:name,token:token });
    }else{
        res.send({ loggedin: false, message: "Incorrect credentials" });
    }
});

app.get("/getUserInfo", verifyToken ,(req, res) => {
    res.json({authenticated:true , message:'authentication successful'})
});

app.listen(PORT, () => {
  console.log(`app istening on port ${PORT}`);
});
