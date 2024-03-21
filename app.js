var express= require('express');
var app = express();
var mysql = require('mysql');
var cors = require('cors');
app.use(express.json());

app.use(cors({
    "origin" : '*',
}))

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Root@123",
    database:"school",
    connectTimeout:50
})

app.get("/students",(req,res)=>{
    pool.getConnection(function(error,temcont){
        if(!!error){
            temcont.release();
            console.log(error);
        }else{
            console.log('connected');
            temcont.query("select * from Students;",function(err,result,field){
                temcont.release();
                if(!!err){
                     console.log('Error');
                }else{
                    res.json(result);
                }
            });
        }
    });
    }); 

app.listen(8080)