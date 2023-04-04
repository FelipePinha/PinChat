const socket = io();

const messageList = document.querySelector(".messages");
const chatForm = document.getElementById("chat-form");
const inputMsg = document.getElementById("send");

// get username from url param
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get("name");

// socket.on("message", msg => {
//     console.log(msg);
//     // outputMessage(msg);
// });

socket.emit("new user", username);

socket.on("new user", data => {
    // console.log(data);
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

    messageList.appendChild(newMessage);
    messageList.scrollTo(0, messageList.scrollHeight);
});
