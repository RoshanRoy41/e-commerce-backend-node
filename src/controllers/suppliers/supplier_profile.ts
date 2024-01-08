import {Request,Response, Router} from 'express';
import EcSuppliers from '../../models/ec_suppliers';

const supplierProfile = async(req:Request,res:Response):Promise<void>=>{
try{
    const users = await EcSuppliers.findAll({ raw: true, // Retrieve raw data instead of Sequelize models
     });
     res.status(200).json(users);
 }
 catch(e){
     console.log(e);
     res.status(404).send('404!Error');
 }
}

export default supplierProfile;