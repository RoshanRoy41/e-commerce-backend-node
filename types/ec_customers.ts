import {Model} from 'sequelize';

class EcCustomers extends Model{
    public id?: number;
    public full_name!: string;
    public email!: string;
    public password!: string;
    public profile_pic!: Buffer | null; //why do we store images in a buffer
    public registration_id?: string;
    public registration_timestamp?: Date;
    public createdAt?: Date;
    public updatedAt?: Date;
}

export default EcCustomers; 