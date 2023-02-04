import { LikedPostDTOOutputFromDB } from './../../model/Likes/LikedPostDTOOutputFromDB';
import { LikedPostDTOFromTS } from './../../model/Likes/LikedPostDTOFromTS';
import { RequestToDelDTOToDB } from '../../model/Friendships/RequestToDelDTOToDB';
import { CustomError } from '../../error/CustomError';
import { BaseDatabase } from '../BaseDatabase';
import { LikedPostDTOToDB } from '../../model/Likes/LikedPostDTOToDB';


export class LikesDatabase extends BaseDatabase {

    private userTable = 'labook_likes'


    public likePost = async (request: LikedPostDTOToDB): Promise<void> => {
        try {

            let requestToDB: LikedPostDTOToDB = {
                id: request.id,
                user: request.user,
                post: request.post,
            }

            await LikesDatabase.connection.insert(requestToDB).into(this.userTable)

        } catch (error: any) {

            throw new CustomError(error.statusCode, error.message)

        }

    }

    public checkIfLiked = async (request: LikedPostDTOFromTS): Promise<LikedPostDTOOutputFromDB[]> => {
        try {

            let requestToDB: LikedPostDTOFromTS = {
                user: request.user,
                post: request.post,
            }

            let queryResults:LikedPostDTOOutputFromDB[] = await LikesDatabase.connection(this.userTable).select('*').where(requestToDB)

            return queryResults

        } catch (error: any) {

            throw new CustomError(error.statusCode, error.message)

        }

    }

    public dislikePost = async (request: LikedPostDTOFromTS): Promise<void> => {
        try {

            let requestToDB: LikedPostDTOFromTS = {
                user: request.user,
                post: request.post,
            }

            await LikesDatabase.connection(this.userTable).where(requestToDB).del()

            console.log('teste')

        } catch (error: any) {
            console.log(error)
            throw new CustomError(error.statusCode, error.message)

        }

    }

}
