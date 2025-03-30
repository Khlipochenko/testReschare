
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "./utils/connect.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";
import { userRouter } from "./routes/userRouter.js";
import { itemRouter } from "./routes/itemRouter.js";
import { chatRouter } from "./routes/chatRouter.js";
import { contactRouter } from './routes/contactRouter.js';
import { connectCloudinary } from "./utils/cloudinary.js";
import { searchRouter } from "./routes/searchRouter.js";
import { messageRouter } from "./routes/messageRouter.js";
import { inboxRouter } from "./routes/inboxRouter.js";
import { app, server } from "./socket/socket.js";
import passport from "passport";
import "./services/googleAuthService.js";

dotenv.config();


// const app = express();  hier app gelöscht weil in socket
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
app.use(cookieParser());
await connectCloudinary();


app.use(passport.initialize());


//Routers
app.use("/api/users", userRouter);
app.use('/api/items', itemRouter)
app.use('/api/chats', chatRouter)
app.use('/api/contact', contactRouter)
app.use('/api/search', searchRouter)
app.use('/api/messages', messageRouter);
app.use('/api/inbox', inboxRouter)
app.get("/", (req, res) => res.send("API Working"));
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  next();
});
app.use(errorMiddleware)
const PORT = process.env.PORT || 6000;




//hier server anstatt app
connect().then(() => {
  server.listen(PORT, () =>
    console.log(`Server läuft auf http://localhost:${PORT}`)
  );
});
