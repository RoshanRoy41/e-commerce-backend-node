import express from 'express'
import {Request, Response} from 'express'
import Router from "express";
import EcCustomers from '../models/ec_customers';
import customerRegistration from '../controllers/customers/customer_registration';
import customerProfile from '../controllers/customers/customer_profile';

const customerRouteHandler = express.Router();


customerRouteHandler.post("/register", (req:Request,res:Response)=>{
    customerRegistration(req,res);
});


customerRouteHandler.get("/getUsers",  async (req: Request, res: Response) => {
 customerProfile(req,res);
});

export default customerRouteHandler;
