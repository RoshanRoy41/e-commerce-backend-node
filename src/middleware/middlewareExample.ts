import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request{
    customProperty?:string;
  }

export const firstExamp =(req:CustomRequest,res:Response,next:NextFunction)=>{
    req.customProperty = JSON.stringify({ message: 'hello' });
    next();
}
export const secondExamp =(req:CustomRequest,res:Response,next:NextFunction)=>{
    res.setHeader('Content-type', 'application/json');
    res.setHeader('Set-cookie', ['type=ninja', 'language=javascript']);
    next();
}

