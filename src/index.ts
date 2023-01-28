import { app } from "./app"
import { userRouter } from './routes/UserRoutes';
import { postRouter } from './routes/PostRoutes';



//Rotas para User
app.use("/user", userRouter)

//Rotas para Post
app.use("/post", postRouter)