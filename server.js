import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = path.resolve();

app.use(express.static(__dirname + "/public"));

const users = [];

io.on("connection", socket => {
    socket.on("new user", data => {
        users.push({ name: data, id: socket.id });
        socket.emit("new user", users);
        socket.emit("message", "Bem vindo ao chat");
        socket.broadcast.emit("message", `${data} entrou no chat.`);
    });

    socket.on("chat message", user => {
        io.emit("chat message", user);
    });

    socket.on("disconnect", () => {
        io.emit("message", "Um usuário se desconectou");
    });
});

server.listen(3000, () => console.log("server rodando na porta 3000"));
