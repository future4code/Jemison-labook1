import { CustomError } from './../../error/CustomError';
import { User } from "../../model/Users/User"
import { BaseDatabase } from "../BaseDatabase"


export class UserDatabase extends BaseDatabase {

    private userTable = 'labook_users'


    public insertUser = async (user: User):Promise<void> => {
        try {

            UserDatabase.connection.initialize()
            
            await UserDatabase.connection.insert({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            }).into(this.userTable)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        } finally {
            UserDatabase.connection.destroy();
        }

    }

}
