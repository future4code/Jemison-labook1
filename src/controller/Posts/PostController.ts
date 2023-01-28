import { Request, Response} from 'express'
import { PostBusiness } from '../../business/Posts/PostBusiness';
import { PostInputDTO } from '../../model/Posts/PostInputDTO';

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
}

