import { FriendshipController } from './../controller/Friendships/FriendshipController';
import express from 'express';



const friendshipController = new FriendshipController();

export const friendshipRouter = express.Router();

friendshipRouter.post("/create",friendshipController.createFriendship)

friendshipRouter.delete("/delete",friendshipController.deleteFriendship)

friendshipRouter.get("/details",friendshipController.getFriendshipByUsers)