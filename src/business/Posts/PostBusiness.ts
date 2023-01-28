import { PostOutputDTOToTS } from './../../model/Posts/PostOutputDTOToTS';
import { PostOutputDTO } from './../../model/Posts/PostOutputDTO';
import { PostIDInputDTO } from './../../model/Posts/PostIDInputDTO';
import { PostInputDTO } from './../../model/Posts/PostInputDTO';
import { PostDatabase } from '../../data/Posts/PostDatabase';
import { NoPhoto, EmptyDescription, NoAuthor, EmptyFields, PostNotFound } from './../../error/PostError';
import { generateID } from './../../services/idGenerator';
import { Post } from '../../model/Posts/Post';
import { CustomError } from './../../error/CustomError';


export class PostBusiness {
    public createPost = async (input: PostInputDTO) => {
        try {

            const postDatabase = new PostDatabase()

            const { photo, description, type, author } = input;

            console.log(input)

            if (!photo && !description && !author) {
                throw new EmptyFields()
            }

            if (!photo) {
                throw new NoPhoto()
            }

            if (!description) {
                throw new EmptyDescription()
            }

            if (!author) {
                throw new NoAuthor()
            }

            const id: string = generateID()

            const post: Post  = {
                id,
                photo,
                description,
                type,
                author
            }

            await postDatabase.createPost(post)

        } catch (error: any) {

            throw new CustomError(error.statusCode, error.message)

        }
    }


    public getPostByID = async (id: string) => {

        try {
           const postDatabase = new PostDatabase()
           
           let queryResult = await postDatabase.getPostByID(id);

           if (!queryResult[0]) {
                throw new PostNotFound()
           }

           const output: PostOutputDTO = {
            id: queryResult[0].id,
            photo: queryResult[0].photo,
            description: queryResult[0].description,
            type: queryResult[0].type,
            created_at: queryResult[0].created_at,
            author_id: queryResult[0].author_id,
         }

         const post:PostOutputDTOToTS = {
            id: output.id,
            photo: output.photo,
            description: output.description,
            type: output.type,
            createdAt: new Date(output.created_at),
            author: output.author_id
         }

           return post
           
        } catch (error: any) {
           throw new CustomError(error.statusCode, error.message)
  
        }
     }
}
