import express from "express";

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(3000, () => console.log("server rodando na porta 3000"));
