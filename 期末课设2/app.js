const express=require("express");
const app=express()
const cors=require("cors")
const session = require('express-session');
const bodyParser = require('body-parser');

const jwt = require('express-jwt');
const { unless } = require('express-jwt');

app.use(express.static('./public'))
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: 'hqm', // 替换为您自己的密钥
    resave: false,
    saveUninitialized: true
}));

const secretKey='hqm'
app.use(jwt.expressjwt({secret:'hqm',algorithms: ['HS256']}).unless({path:['/login']}))
//解码
app.use(express.urlencoded({extended:false}))
app.use((err,req,res,next)=>{
    if(err.name==='UnauthorizedError'){
        console.log('token出问题')
            return res.send(
               {
                status:401,
                message:'无效的token'
               }
            )
              
    }
    res.send(
        {
         status:500,
         message:'未知错误'
        })
})
 
const userRouter=require('./router/user')
app.use(userRouter)


app.listen(3007,function(){
    console.log('api server running at http://127.0.0.1:3007')
})
