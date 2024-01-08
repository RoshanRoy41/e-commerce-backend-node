import express, { NextFunction, Router } from 'express';//here, the function express gets fetched into the express variable
import {Request,Response} from 'express';//here, the function express gets fetched into the express variable
import sequelize from './config/sequelize-config';
import supplierRouteHandler from './router/supplier_routes';
import customerRouteHandler from './router/customer_routes';
import login from './controllers/authentication/login'
import { firstExamp } from './middleware/middlewareExample';
import { secondExamp } from './middleware/middlewareExample';


const app = express(); 
const PORT = 3000; // ||process.env.Port = 3000


sequelize.sync({ force: false }) // Set force to true to drop and recreate tables on every application start
  .then(() => {
    console.log('Database synced');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

  app.listen(PORT,()=>{
    console.log(`Running on ${PORT}`);
})



app.use(express.urlencoded({extended:true}));


app.use(express.json()); //sync the database

// const customHeaderMiddleware = (req:Request, res:Response, next:NextFunction) => {
//   res.setHeader('customProperty', 'type-Roshan');
//   next();
// }

// app.get('/mwexample',(req,res,next)=>{
//   console.log("MW Route Handler")
//   const customProperty = req.customProperty || 'Not Available';
//   res.status(200).send(`Response with modified Request Property: ${customProperty}`);
//   next();
// })

// app.use(customHeaderMiddleware);

interface CustomRequest extends Request{
  customProperty?:string;
}

// app.use((req: CustomRequest, res, next) => {
//   firstExamp(req,res,next)
// });

// app.use((req, res, next) => {
//   secondExamp(req,res,next)
// });

app.get("/example", firstExamp,secondExamp,(req: CustomRequest, res: Response) => {
  console.log("Route Handler-Handling Request");
  const customProperty = req.customProperty ?? 'Not-available';
  res.send(customProperty);
});


app.use("/v1/",supplierRouteHandler);
app.use("/v2/",customerRouteHandler);
app.use("/login",login);




// app.get("/",(req:Request,res:Response)=>{
//     const {name,age} = req.query; //Destructing
//     res.send(`${name},${age}`);
// })


// app.post("/contact",(req,res)=>{
//     try{const {name,phone,email} = req.body;
//     if(!name){
//         res.status(422).json({message:"422!name missing!"})
//     }
//     // res.status(200).send(`contact details of ${name} received as ${email} and ${phone}`) // returns as string
//     res.status(200).json({message:`contact details of ${name} received as ${email} and ${phone}`}) //returns as an object
//     }
//     catch(e){
//         console.log(e);
//         res.status(404).send('404!Error');
//     }
// })
