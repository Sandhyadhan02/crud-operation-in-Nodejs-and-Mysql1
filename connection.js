const mysql =require('mysql')
const con =mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "",
    database:"crudoperation",
    port:3306
});
con.connect((err)=>{
    if(err)
    throw err;
    else{
        console.log("connection create..!!");
    }
})
module.exports.con =con;