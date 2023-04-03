import express from "express";
import path from "path";

const app = express();

const __dirname = path.resolve() + "/public/";

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/chat", (req, res) => {
    res.sendFile(__dirname + "pages/chat.html");
});

app.listen(3000, () => console.log("server rodando na porta 3000"));
