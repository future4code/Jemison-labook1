import express from 'express';
import { PostController } from './../controller/Posts/PostController';


const postController = new PostController();

export const postRouter = express.Router();

postRouter.get("/",postController.getPostsByType)

postRouter.post("/create",postController.createPost)

postRouter.get("/feed",postController.getFriendsFeed)

postRouter.get("/:id",postController.getPostByID)
