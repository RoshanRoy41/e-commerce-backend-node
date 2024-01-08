import {Request, Response, Router} from 'express';
import EcCustomers from '../../models/ec_customers';


const customerRegistration = async(req:Request,res:Response):Promise<void> =>{
    try{
        const {full_name,email,password,profile_pic} = req.body;
        EcCustomers.create({
                            full_name,
                            email,
                            password,
                            profile_pic:Buffer.from(profile_pic),
    },{raw:true});
   
    res.status(200).json({message:`Registration of the user ${full_name} completed`}) //returns as an object
    }
    catch(e:any){
        console.error(e);
        res.status(404).send('404!Error');
    }
}

export default customerRegistration;