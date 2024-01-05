const express = require('express') //here, the function express gets fetched into the express variable

const app = express(); 
const PORT = 3000; // ||process.env.Port = 3000
app.listen(PORT,()=>{
    console.log(`Running on ${PORT}`);
})

app.use(express.json());
app.get("/",(req,res)=>{
    const {name,age} = req.query; //Destructing
    res.send(`${name},${age}`);
})



app.post("/contact",(req,res)=>{
    const {name,phone,email} = req.body;
    if(!name){
        res.status(422).json({message:"name missing"})
    }
    // res.status(200).send(`contact details of ${name} received as ${email} and ${phone}`) // returns as string
    res.status(200).json({message:`contact details of ${name} received as ${email} and ${phone}`}) //returns as an object
    
})

