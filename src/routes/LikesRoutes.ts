import { LikesController } from './../controller/Likes/LikesController';
import express from 'express';



const likesController = new LikesController();

export const likesRouter = express.Router();

likesRouter.post("/like",likesController.likePost)

likesRouter.get("/check",likesController.checkIfLiked)

likesRouter.delete("/dislike",likesController.dislikePost)

