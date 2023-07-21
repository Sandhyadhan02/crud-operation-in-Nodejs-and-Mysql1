const express =require('express');
const app=express();
const port =3004
const mysql =require('./connection').con
//configuration
app.set("view engine", "hbs");
app.set("views", "./view")
app.use(express.static(__dirname + "/public"))

app.use(express.urlencoded())
app.use(express.json())
//localhost


//Routing
app.get("/",(req,res)=>{
     res.render("index")
});
app.get("/add",(req,res)=>{
    res.render("add")
});
app.get("/search",(req,res)=>{
    res.render("search")
});
app.get("/update",(req,res)=>{
    res.render("update")
});
app.get("/delete",(req,res)=>{
    res.render("delete")
});
app.get("/view",(req,res)=>{
    res.render("view")
});
app.get("/addstudent",(req,res)=>{
     //fetching data from database
      const { name, phone, email, gender }=req.query
      let qry ="select * from test where emailid=? or phoneno=?";
      mysql.query(qry,[email,phone],(err, results)=>{
if(err)
throw err
else{
   if(results.length>0){
     res.render("add",{checkmesg:true})
   }
   else{
    //insert query
    let qry2 ="insert into test values(?,?,?,?)";
    mysql.query(qry2,[name, phone, email, gender], (err,results)=>{
        if(results.affectedRows > 0){
            res.render("add",{mesg:true})
        }
    })
}
}
      })
});
app.post("/searchstudent",(req,res)=>{
     const {phone}= req.query;
     let qry ="select * from test  where phoneno=?";
     mysql.query(qry,[phone], (err,results)=>{
        if(err)
        throw err
        else{
if(results.length >0){
res.render("search",{mesg1:true,mesg2:false})
}
else{
    res.render("search",{mesg1:false,mesg2:true})
}
        }
     })
})
 

//Create server
app.listen(port,(err)=>{
    if(err)
    throw err
    else{
        console.log("Server is running at port %d",port);
    }
});