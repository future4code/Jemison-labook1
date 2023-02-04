import { LikesBusiness } from './../../business/Likes/LikesBusiness';
import { Request, Response } from 'express';
import { LikedPostDTOFromTS } from './../../model/Likes/LikedPostDTOFromTS';


export class LikesController {
   public likePost = async (req: Request, res: Response) => {
      try {
         const input: LikedPostDTOFromTS = {
            user: req.body.user,
            post: req.body.post
         }

         const likesBusiness = new LikesBusiness()

         await likesBusiness.likePost(input)

         res.status(201).send({ message: "Post curtido com sucesso!" })

      } catch (error: any) {
         res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
      }
   }

   public checkIfLiked = async (req: Request, res: Response) => {
      try {
         const input: LikedPostDTOFromTS = {
            user: req.body.user,
            post: req.body.post
         }

         const likesBusiness = new LikesBusiness()

         let results = await likesBusiness.checkIfLiked(input)

         res.status(200).send({ message: "Parece que você já curtiu esse post antes!", post: results })

      } catch (error: any) {
         res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
      }
   }

   public dislikePost = async (req: Request, res: Response) => {
      try {
         const input: LikedPostDTOFromTS = {
            user: req.body.user,
            post: req.body.post
         }

         const likesBusiness = new LikesBusiness()

         await likesBusiness.dislikePost(input)

         res.status(201).send({ message: "Post descurtido!" })

      } catch (error: any) {
         res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
      }
   }
}