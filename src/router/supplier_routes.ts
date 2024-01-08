import express from 'express'
import {Request, Response} from 'express'
import Router from "express";
import EcSuppliers from '../models/ec_suppliers';
import supplierRegistration from '../controllers/suppliers/supplier_registration';
import supplierProfile from '../controllers/suppliers/supplier_profile';

const supplierRouteHandler = express.Router();


supplierRouteHandler.post("/register", (req:Request,res:Response)=>{
   supplierRegistration(req,res);
});


supplierRouteHandler.get("/getUsers",  async (req: Request, res: Response) => {
   supplierProfile(req,res);
});

export default supplierRouteHandler;
