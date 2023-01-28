import { PostInputDTO } from './../../model/Posts/PostInputDTO';
import { PostDatabase } from '../../data/Posts/PostDatabase';
import { NoPhoto, EmptyDescription, NoAuthor, EmptyFields } from './../../error/PostError';
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

            await postDatabase.insertPost(post)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}
