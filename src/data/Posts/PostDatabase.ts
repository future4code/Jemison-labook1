import { PostOutputDTOToTS } from './../../model/Posts/PostOutputDTOToTS';
import { PostOutputDTO } from './../../model/Posts/PostOutputDTO';
import { PostIDInputDTO } from './../../model/Posts/PostIDInputDTO';
import { CustomError } from './../../error/CustomError';
import { PostDTO } from './../../model/Posts/PostDTO';
import { postType } from './../../model/Posts/PostType';
import { Post } from './../../model/Posts/Post';
import { BaseDatabase } from './../BaseDatabase';



export class PostDatabase extends BaseDatabase {

    private userTable = 'labook_posts'


    public createPost = async (post: Post): Promise<void> => {
        try {

            PostDatabase.connection.initialize()

            let postToDB: PostDTO = {
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

    public getPostByID = async (id: string): Promise<PostOutputDTO[]> => {
        try {

            PostDatabase.connection.initialize()

            const post = await PostDatabase.connection(this.userTable).select("*").where({ id })

            return post;

        } catch (error: any) {

            throw new CustomError(error.statusCode, error.message)

        } finally {

            PostDatabase.connection.destroy();

        }

    }

    public getFriendsFeed = async (id: string): Promise<PostOutputDTO[]> => {
        try {

            PostDatabase.connection.initialize()

            let friendsTable:string = 'labook_friendships'
            let postAuthor:string = 'labook_posts.author_id'
            let FKReceiver:string = 'labook_friendships.fk_friendship_receiver'
            let FKRequester:string = 'labook_friendships.fk_friendship_requester'

            const part1:PostOutputDTO[] = await PostDatabase.connection(this.userTable).join(friendsTable, postAuthor, '=', FKReceiver).where({fk_friendship_requester: id})
            .select('*')


            const part2:PostOutputDTO[] = await PostDatabase.connection(this.userTable).join(friendsTable, postAuthor, '=', FKRequester).where({fk_friendship_receiver: id})
            .select('*')

            console.log(part1.length, part2.length)


            let posts:PostOutputDTO[] = part1.concat(part2)

            return posts;

        } catch (error: any) {

            throw new CustomError(error.statusCode, error.message)

        } finally {

            PostDatabase.connection.destroy();

        }

    }

    public getPostsByType = async (type: string): Promise<PostOutputDTOToTS[]> => {
        try {

            PostDatabase.connection.initialize()

            let queryResults:PostOutputDTO[] = await PostDatabase.connection(this.userTable).select("*").where({ type })

            let posts = queryResults.map((query) => {
                let post: PostOutputDTOToTS = {
                    id: query.id,
                    photo: query.photo,
                    description: query.description,
                    type: query.type,
                    createdAt: new Date(query.created_at).toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute:"numeric"}),
                    author: query.author_id
                }
                return post
            })

            return posts;

        } catch (error: any) {

            throw new CustomError(error.statusCode, error.message)

        } finally {

            PostDatabase.connection.destroy();

        }

    }

}
