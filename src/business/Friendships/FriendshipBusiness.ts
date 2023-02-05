import { OutputDTOToDB } from './../../model/Friendships/OutputDTOToDB';
import { RequestInputDTO } from './../../model/Friendships/RequestInputDTO';
import { RequestDTOToDB } from './../../model/Friendships/RequestDTOToDB';
import { CannotDeleteFriendshipNotFound, FriendshipAlreadyExists, FriendshipNotFound } from './../../error/FriendshipError';
import { FriendshipDatabase } from '../../data/Friendships/FriendshipDatabase';
import { EmptyFields, EmptyRequester, EmptyReceiver } from '../../error/FriendshipError';
import { generateID } from './../../services/idGenerator';
import { FriendshipRequest } from '../../model/Friendships/FriendshipRequest';
import { CustomError } from './../../error/CustomError';
import { OutputDTOToTS } from '../../model/Friendships/OutputDTOToTS';


export class FriendshipBusiness {
    public createFriendship = async (input: RequestInputDTO) => {
        try {

            const friendshipDatabase = new FriendshipDatabase()

            const { requester, receiver } = input;

            if (!requester && !receiver) {
                throw new EmptyFields()
            }

            if (!requester) {
                throw new EmptyRequester()
            }

            if (!receiver) {
                throw new EmptyReceiver()
            }

            let queryResult = await friendshipDatabase.getFriendshipsByUsers(input)

            if (queryResult.length > 0) {
                throw new FriendshipAlreadyExists()
            }

            const id: string = generateID()

            const request: FriendshipRequest = {
                id,
                requester,
                receiver
            }

            await friendshipDatabase.createFriendship(request)

        } catch (error: any) {

            throw new CustomError(error.statusCode, error.message)

        }
    }

    public getFriendshipByUsers = async (request: RequestInputDTO) => {

        try {
            const friendshipDatabase = new FriendshipDatabase()

            let queryResult = await friendshipDatabase.getFriendshipsByUsers(request);

            if (!queryResult[0]) {

                let invertedRequest = {
                    requester: request.receiver,
                    receiver: request.requester
                }

                let checkForFriendshipAgain = await friendshipDatabase.getFriendshipsByUsers(invertedRequest)

                if (!checkForFriendshipAgain[0]) {
                    throw new FriendshipNotFound()
                }

                const output: OutputDTOToDB = {
                    fk_friendship_requester: checkForFriendshipAgain[0].fk_friendship_requester,
                    fk_friendship_receiver: checkForFriendshipAgain[0].fk_friendship_receiver
                }
    
                const friendshipFound: OutputDTOToTS = {
                    requester: output.fk_friendship_requester,
                    receiver: output.fk_friendship_receiver
                }
    
                return friendshipFound
            }

            const output: OutputDTOToDB = {
                fk_friendship_requester: queryResult[0].fk_friendship_requester,
                fk_friendship_receiver: queryResult[0].fk_friendship_receiver
            }

            const friendshipFound: OutputDTOToTS = {
                requester: output.fk_friendship_requester,
                receiver: output.fk_friendship_receiver
            }

            return friendshipFound

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)

        }
    }

    public deleteFriendship = async (input: RequestInputDTO) => {
        try {

            const friendshipDatabase = new FriendshipDatabase()

            const { requester, receiver } = input;

            if (!requester && !receiver) {
                throw new EmptyFields()
            }

            if (!requester) {
                throw new EmptyRequester()
            }

            if (!receiver) {
                throw new EmptyReceiver()
            }

            const request: RequestInputDTO = {
                requester,
                receiver
            }

            let doesFriendExist = await friendshipDatabase.getFriendshipsByUsers(request)

            if (!doesFriendExist[0]) {

                let invertedRequest = {
                    requester: receiver,
                    receiver: requester
                }

                let checkForFriendshipAgain = await friendshipDatabase.getFriendshipsByUsers(invertedRequest)

                if (!checkForFriendshipAgain[0]) {
                    throw new CannotDeleteFriendshipNotFound()
                }

                await friendshipDatabase.deleteFriendship(invertedRequest)

                return invertedRequest
            }

            await friendshipDatabase.deleteFriendship(request)

        } catch (error: any) {

            throw new CustomError(error.statusCode, error.message)

        }
    }
}
