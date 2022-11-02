import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import projectRoute from "./routes/projectRoute.js";
import taskRoute from "./routes/taskRoute.js";

import { Server } from "socket.io";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

// DB
connectDB();

//config cors
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      //can make petitions
      callback(null, true);
    } else {
      //cant make petitions
      callback(new Error("Error de Cors"));
    }
  },
};

app.use(cors(corsOptions));

// Routing
app.use("/api/users", userRoute);
app.use("/api/projects", projectRoute);
app.use("/api/tasks", taskRoute);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

//socket io

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  //events
});
