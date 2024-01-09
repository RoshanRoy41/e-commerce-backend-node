import express from 'express'
import {Request, Response} from 'express'
import Router from "express";
import EcCustomers from '../../models/ec_customers';
import EcSuppliers from '../../models/ec_suppliers';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// const login = express.Router();
 
// login.post("/", async (req: Request, res: Response) => {
//     const { e_mail, password, client_type } = req.body;
//     try {
//        console.log(e_mail)
//         if (client_type === "supplier") {
//             const data = await EcSuppliers.findOne({ where: { email:e_mail }, raw: true });
//             if (data?.password === password) {
//                 const token = Jwt.sign(
//                     { userId: data?.registration_id, client_type },
//                     'idghkjsadfg34ert586rtgfhgghetf', // Replace with your secret key
//                     { expiresIn: '24h' } // Token expiration time
//                   );
//                 res.status(200).json({ message: "Login successful...","token":token });
//             }
//             else {
//                 res.status(401).json({ message: "Unauthorized Login..." });
//             }
//         }
//         else if (client_type === "customer") {
//             const data = await EcCustomers.findOne({ where: { e_mail: e_mail }, raw: true })
//             if (data?.password === password) {
//                 res.status(200).json("Login Successful...");
//             }
//             else {
//                 res.status(401).json({ message: "Invalid credentials" })
//             }
//         }
//     }
//     catch (error: any) {
//         console.log(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });

// const customerProfile = async (req: Request, res: Response): Promise<void> => {
//     const { client_type } = req.body;
//     let found = {};
//     if (client_type == "customer") {
//       found = await EcCustomers.findAll({
//         where: {},
//         raw: true,
//       });
//     } else if (client_type == "supplier") {
//       found = await EcSuppliers.findAll({
//         where: {},
//         raw: true,
//       });
//     }
//     console.log(found);
  
//     res.send(found);
//   };
  
 
// export default login;

// export { customerProfile };

const login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { client_type, e_mail, password } = req.body;
      if (client_type == "customer") {
        const found = await EcCustomers.findOne({
          where: { e_mail },
          raw: true,
        });
  
        console.log(bcrypt.compareSync(password, found?.password as string));
  
        if (bcrypt.compareSync(password, found?.password as string)) {
          const token = jwt.sign(
            {
              //payloads
              userID: found?.registration_id,
              client_type,
            },
            "your-secret-key",
            { expiresIn: "24h" } //token expiration time
          );
          // res.send(`message : login successfully`);
          res.json(token);
        } else {
          res.status(401).json({ message: `authentication failed` });
        }
      } else if ("supplier") {
        let found = await EcSuppliers.findOne({
          where: { e_mail: { e_mail } },
          raw: true,
        });
  
        console.log(bcrypt.compareSync(password, found?.password as string));
  
        if (bcrypt.compareSync(password, found?.password as string)) {
          res.send(`message : login s successfully`);
        } else {
          res.status(401).json({ message: `authentication failed` });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const customerProfile = async (req: Request, res: Response): Promise<void> => {
    const { client_type } = req.body;
    let found = {};
    if (client_type == "customer") {
      found = await EcCustomers.findAll({
        where: {},
        raw: true,
      });
    } else if (client_type == "supplier") {
      found = await EcSuppliers.findAll({
        where: {},
        raw: true,
      });
    }
    console.log(found);
  
    res.send(found);
  };
  
  export default login;
  export { customerProfile };