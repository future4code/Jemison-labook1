import { CustomError } from './../../error/CustomError';
import { UserInputDTO } from './../../model/Users/UserInputDTO';
import { UserDatabase } from './../../data/Users/UserDatabase';
import { EmptyFields, EmptyName, EmptyEmail, EmptyPassword, PasswordTooShort, InvalidEmail } from './../../error/UserError';
import { generateID } from './../../services/idGenerator';
import { validateEmail } from './../../services/emailValidator';
import { User } from '../../model/Users/User';


export class UserBusiness {
    public createUser = async (input: UserInputDTO) => {
        try {

            const userDatabase = new UserDatabase()

            const { name, email, password } = input;

            if (!name && !email && !password) {
                throw new EmptyFields()
            }

            if (!name) {
                throw new EmptyName()
            }

            if (!email) {
                throw new EmptyEmail()
            }

            if (!password) {
                throw new EmptyPassword()
            }

            if (!validateEmail(email)) {
                throw new InvalidEmail()
            }

            if (password.length <= 8) {
                throw new PasswordTooShort()
            }

            const id: string = generateID()

            const user: User = {
                id,
                name,
                email,
                password
            }

            await userDatabase.insertUser(user)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    //    public getUsers = async () => {

    //       try {
    //          const userDatabase = new UserDatabase()

    //          return await userDatabase.getUsers();

    //       } catch (error: any) {
    //          throw new CustomError(error.statusCode, error.message)

    //       }
    //    }


}
