import express from 'express'
import {Request, Response} from 'express'
import Router from "express";
import EcCustomers from '../../models/ec_customers';
import EcSuppliers from '../../models/ec_suppliers';
import Jwt from 'jsonwebtoken';


const login = express.Router();
 
login.post("/", async (req: Request, res: Response) => {
    const { e_mail, password, client_type } = req.body;
    try {
       console.log(e_mail)
        if (client_type === "supplier") {
            const data = await EcSuppliers.findOne({ where: { email:e_mail }, raw: true });
            if (data?.password === password) {
                const token = Jwt.sign(
                    { userId: data?.registration_id, client_type },
                    'idghkjsadfg34ert586rtgfhgghetf', // Replace with your secret key
                    { expiresIn: '24h' } // Token expiration time
                  );
                res.status(200).json({ message: "Login successful...","token":token });
            }
            else {
                res.status(401).json({ message: "Unauthorized Login..." });
            }
        }
        else if (client_type === "customer") {
            const data = await EcCustomers.findOne({ where: { e_mail: e_mail }, raw: true })
            if (data?.password === password) {
                res.status(200).json("Login Successful...");
            }
            else {
                res.status(401).json({ message: "Invalid credentials" })
            }
        }
    }
    catch (error: any) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
 
export default login;

