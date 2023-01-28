import { CustomError } from './../../error/CustomError';
import { PostDTO } from './../../model/Posts/PostDTO';
import { postType } from './../../model/Posts/PostType';
import { Post } from './../../model/Posts/Post';
import { BaseDatabase } from './../BaseDatabase';



export class PostDatabase extends BaseDatabase {

    private userTable = 'labook_posts'


    public insertPost = async (post: Post): Promise<void> => {
        try {

            PostDatabase.connection.initialize()

            let postToDB:PostDTO = {
                id: post.id,
                photo: post.photo,
                description: post.description,
                type: post.type || undefined,
                author_id: post.author
            }

            await PostDatabase.connection.insert(postToDB).into(this.userTable)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        } finally {
            PostDatabase.connection.destroy();
        }

    }

}
