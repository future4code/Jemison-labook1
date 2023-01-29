import { RequestToDelDTOToDB } from './../../model/Friendships/RequestToDelDTOToDB';
import { CustomError } from './../../error/CustomError';
import { FriendshipRequest } from '../../model/Friendships/FriendshipRequest';
import { RequestDTOToDB } from '../../model/Friendships/RequestDTOToDB';
import { BaseDatabase } from './../BaseDatabase';
import { RequestInputDTO } from '../../model/Friendships/RequestInputDTO';


export class FriendshipDatabase extends BaseDatabase {

    private userTable = 'labook_friendships'


    public createFriendship = async (request: FriendshipRequest): Promise<void> => {
        try {

            FriendshipDatabase.connection.initialize()

            let requestToDB: RequestDTOToDB = {
                id: request.id,
                fk_friendship_requester: request.requester,
                fk_friendship_receiver: request.receiver,
            }

            await FriendshipDatabase.connection.insert(requestToDB).into(this.userTable)

        } catch (error: any) {

            throw new CustomError(error.statusCode, error.message)

        } finally {

            FriendshipDatabase.connection.destroy();

        }

    }

    public getFriendshipsByUsers = async (friendship: RequestInputDTO): Promise<RequestDTOToDB[]> => {
        try {

            FriendshipDatabase.connection.initialize()

            let requestToDB: RequestToDelDTOToDB = {
                fk_friendship_requester: friendship.requester,
                fk_friendship_receiver: friendship.receiver,
            }

            const friendshipFound = await FriendshipDatabase.connection(this.userTable).select("*").where(requestToDB)

            return friendshipFound;

        } catch (error: any) {

            throw new CustomError(error.statusCode, error.message)

        }

    }

    public deleteFriendship = async (request: RequestInputDTO): Promise<void> => {
        try {

            FriendshipDatabase.connection.initialize()

            let requestToDB: RequestToDelDTOToDB = {
                fk_friendship_requester: request.requester,
                fk_friendship_receiver: request.receiver,
            }

            await FriendshipDatabase.connection(this.userTable).where(requestToDB).del()

        } catch (error: any) {
            console.log(error)
            throw new CustomError(error.statusCode, error.message)

        } finally {

            FriendshipDatabase.connection.destroy();

        }

    }

}
