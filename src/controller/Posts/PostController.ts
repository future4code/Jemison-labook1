import { PostIDInputDTO } from './../../model/Posts/PostIDInputDTO';
import { Request, Response } from 'express'
import { PostBusiness } from '../../business/Posts/PostBusiness';
import { PostInputDTO } from '../../model/Posts/PostInputDTO';
import { Post } from '../../model/Posts/Post';
import { PostOutputDTO } from '../../model/Posts/PostOutputDTO';
import { idText } from 'typescript';
import { PostOutputDTOToTS } from '../../model/Posts/PostOutputDTOToTS';

export class PostController {
   public createPost = async (req: Request, res: Response) => {
      try {
         const input: PostInputDTO = {
            photo: req.body.photo,
            description: req.body.description,
            type: req.body.type || undefined,
            author: req.body.author
         }

         const postBusiness = new PostBusiness()

         await postBusiness.createPost(input)

         res.status(201).send({ message: "Post criado!" })

      } catch (error: any) {
         res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
      }
   }

   public getPostByID = async (req: Request, res: Response): Promise<void> => {
      try {

         const input: PostIDInputDTO = {
            id: req.params.id
         }

         const postBusiness = new PostBusiness()

         const post: PostOutputDTOToTS = await postBusiness.getPostByID(input.id)

         res.status(200).send(post)

      } catch (error: any) {

         res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
         
      }
   }

   public getFriendsFeed = async (req: Request, res: Response): Promise<void> => {
      try {

         const input: PostIDInputDTO = {
            id: req.body.id
         }

         const postBusiness = new PostBusiness()

         const posts: PostOutputDTOToTS[] = await postBusiness.getFriendsFeed(input.id)

         res.status(200).send(posts)

      } catch (error: any) {

         res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
         
      }
   }

}

