import { LikesDatabase } from './../../data/Likes/LikesDatabase';
import { LikedPostDTOFromTS } from './../../model/Likes/LikedPostDTOFromTS';
import { CustomError } from './../../error/CustomError';
import { LikedPostDTOToDB } from './../../model/Likes/LikedPostDTOToDB';
import { generateID } from './../../services/idGenerator';
import { EmptyFields, EmptyLikeUser, EmptyPost, LikedPostNotFound, PostAlreadyLiked } from './../../error/LikesError';



export class LikesBusiness {
    
    public likePost = async (input: LikedPostDTOFromTS) => {
        try {

            const likesDatabase = new LikesDatabase()

            const { user, post } = input;

            if (!user && !post) {
                throw new EmptyFields()
            }

            if (!user) {
                throw new EmptyLikeUser()
            }

            if (!post) {
                throw new EmptyPost()
            }

            const id: string = generateID()

            const request: LikedPostDTOToDB = {
                id,
                user,
                post
            }

            let queryResults = await likesDatabase.checkIfLiked(input)

            if (queryResults.length) {
                throw new PostAlreadyLiked()
            }

            await likesDatabase.likePost(request)

        } catch (error: any) {

            throw new CustomError(error.statusCode, error.message)

        }
    }

    public checkIfLiked = async (input: LikedPostDTOFromTS) => {
        try {

            const likesDatabase = new LikesDatabase()

            const { user, post } = input;

            if (!user && !post) {
                throw new EmptyFields()
            }

            if (!user) {
                throw new EmptyLikeUser()
            }

            if (!post) {
                throw new EmptyPost()
            }

            let queryResults = await likesDatabase.checkIfLiked(input)

            if (!queryResults.length) {
                throw new LikedPostNotFound()
            }

            return queryResults

        } catch (error: any) {

            throw new CustomError(error.statusCode, error.message)

        }
    }

    public dislikePost = async (input: LikedPostDTOFromTS) => {
        try {

            const likesDatabase = new LikesDatabase()

            const { user, post } = input;

            if (!user && !post) {
                throw new EmptyFields()
            }

            if (!user) {
                throw new EmptyLikeUser()
            }

            if (!post) {
                throw new EmptyPost()
            }

            const request: LikedPostDTOFromTS = {
                user,
                post
            }

            let doesPostExist = await likesDatabase.checkIfLiked(request)

            if (!doesPostExist.length) {
                throw new LikedPostNotFound()
            }

            await likesDatabase.dislikePost(request)

        } catch (error: any) {

            throw new CustomError(error.statusCode, error.message)

        }
    }
}
