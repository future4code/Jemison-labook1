import { app } from "./app"
import { userRouter } from './routes/UserRoutes';
import { postRouter } from './routes/PostRoutes';
import { friendshipRouter } from "./routes/FriendshipRoutes";



//Rotas para User
app.use("/user", userRouter)

//Rotas para Post
app.use("/post", postRouter)

//Rotas para Friendship
app.use("/friends", friendshipRouter)