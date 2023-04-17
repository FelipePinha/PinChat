import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = path.resolve();

app.use(express.static(__dirname + "/public"));

let users = [];

io.on("connection", socket => {
    socket.on("new user", data => {
        // find if user exist and create new user
        const hasUser = users.findIndex(user => user.name === data);
        if (hasUser === -1) {
            users.push({ name: data, id: socket.id });
            socket.emit("new user", { users, success: true });
            socket.emit("message", "Bem vindo(a) ao chat");
            socket.broadcast.emit("message", `${data} entrou no chat.`);
        } else {
            socket.emit("new user", { success: false });
        }
    });

    socket.on("chat message", user => {
        io.emit("chat message", user);
    });

    socket.on("disconnect", () => {
        const id = socket.id;
        const deletedUser = users.filter(user => user.id === id);
        users = users.filter(user => user.id !== id);
        if (deletedUser.length > 0) {
            io.emit("message", ` ${deletedUser[0].name} saiu.`);
        }
    });
});

server.listen(3000, () => console.log("server rodando na porta 3000"));
