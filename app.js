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

    app.post("/CreateStudent",(req,res)=>{
      pool.getConnection(function(error,temcont){
        if(!!error){
            temcont.release();
            console.log('Error',error);

        }else{
            console.log('Connected');
            var queryString="insert into students(FirstName,LastName,Standrad,Address,Phone_Num)values('"+req.body.Student.FirstName+"','"+req.body.Student.LastName+"',"+req.body.Student.Standard+",'"+req.body.Student.Address+"',"+req.body.Student.Phone   +");"
            temcont.query(queryString,function(err,result,field){
                temcont.release();
                if(!!err){
                    console.log('Error');
                    return res.json(0);
                }else{
                    return res.json(1);
                }
            })
        }
      })
    })

app.listen(8080)