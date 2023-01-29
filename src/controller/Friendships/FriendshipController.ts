import { OutputDTOToTS } from './../../model/Friendships/OutputDTOToTS';
import { FriendshipBusiness } from './../../business/Friendships/FriendshipBusiness';
import { Request, Response } from "express"
import { RequestInputDTO } from "../../model/Friendships/RequestInputDTO"

export class FriendshipController {
   public createFriendship = async (req: Request, res: Response) => {
      try {
         const input: RequestInputDTO = {
            requester: req.body.requester,
            receiver: req.body.receiver
         }

         const friendshipBusiness = new FriendshipBusiness()

         await friendshipBusiness.createFriendship(input)

         res.status(201).send({ message: "Amizade criada!" })

      } catch (error: any) {
         res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
      }
   }

   public getFriendshipByUsers = async (req: Request, res: Response): Promise<void> => {
      try {

         const input: RequestInputDTO = {
            requester: req.body.requester,
            receiver: req.body.receiver
         }

         const friendshipBusiness = new FriendshipBusiness()

         const friendship: OutputDTOToTS = await friendshipBusiness.getFriendshipByUsers(input)

         res.status(201).send(friendship)

      } catch (error: any) {

         res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
         
      }
   }

   public deleteFriendship = async (req: Request, res: Response) => {
      try {
         const input: RequestInputDTO = {
            requester: req.body.requester,
            receiver: req.body.receiver
         }

         const friendshipBusiness = new FriendshipBusiness()

         await friendshipBusiness.deleteFriendship(input)

         res.status(201).send({ message: "Amizade desfeita!" })

      } catch (error: any) {
         res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
      }
   }
}