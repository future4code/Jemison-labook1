import { UserBusiness } from './../../business/Users/UserBusiness';
import { Request, Response} from 'express'
import { UserInputDTO } from './../../model/Users/UserInputDTO';

export class UserController {
   public createUser = async (req: Request, res: Response) => {
      try {
         const input: UserInputDTO = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
         }

         const userBusiness = new UserBusiness()
         
         await userBusiness.createUser(input)

         res.status(201).send({ message: "Usuário criado!" })
         
      } catch (error: any) {
         res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
      }
   }

   public getUsers = async (req: Request, res: Response) => {
      try {

         const userBusiness = new UserBusiness()
         
         let users = await userBusiness.getUsers()

         res.status(200).send(users)
         
      } catch (error: any) {
         res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
      }
   }
}

