import {Request, Response, Router} from 'express';
import EcSuppliers from '../../models/ec_suppliers';


const supplierRegistration = async(req:Request,res:Response):Promise<void> =>{
    try{
        const {full_name,email,password,profile_pic} = req.body;
        EcSuppliers.create({
                            full_name,
                            email,
                            password,
                            profile_pic:Buffer.from(profile_pic),
    },{raw:true});
   
    res.status(200).json({message:`Registration of the user ${full_name} completed`}) //returns as an object
    }
    catch(e){
        console.log(e);
        res.status(404).send('404!Error');
    }
}

export default supplierRegistration;