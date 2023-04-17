const socket = io();

const usersList = document.querySelector(".users-list");
const messageList = document.querySelector(".messages");
const chatForm = document.getElementById("chat-form");
const inputMsg = document.getElementById("send");
const modal = document.querySelector(".overlay");
const closeModalBtn = document.getElementById("close-btn");

// get username from url param
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get("name");

socket.emit("new user", username);

socket.on("new user", data => {
    if (data.success) {
        for (let i = 0; i < data.users.length; i++) {
            const li = document.createElement("li");
            li.textContent = data.users[i].name;
            usersList.appendChild(li);
        }
    } else {
        // alert("Já existe um usuário com esse nome!");
        modal.style.display = "flex";
    }

    socket.on("message", msg => {
        const p = document.createElement("p");
        p.textContent = msg;
        messageList.appendChild(p);
    });
});

chatForm.addEventListener("submit", e => {
    e.preventDefault();

    if (inputMsg.value) {
        // console.log(inputMsg.value);
        socket.emit("chat message", { username, msg: inputMsg.value });
        inputMsg.value = "";
    }
});

socket.on("chat message", user => {
    const newMessage = document.createElement("li");

    newMessage.innerHTML = `
        <h4>${user.username}</h4>

        <p>${user.msg}</p>        
`;

    if (user.username != username) {
        newMessage.style.backgroundColor = "#a4b0c4";
    }

    messageList.appendChild(newMessage);
    messageList.scrollTo(0, messageList.scrollHeight);
});

closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
    window.location.href = "/";
});
