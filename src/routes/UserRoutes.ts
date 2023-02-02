import express from 'express';
import { UserController } from './../controller/Users/UserController';


const userController=new UserController();

export const userRouter= express.Router();

userRouter.get("/all",userController.getUsers)

userRouter.post("/create",userController.createUser)
