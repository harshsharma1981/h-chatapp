var socket = io();
// all variables
const form = document.getElementById("send-form");
const typ = document.getElementById("typing");
const messageinput = document.getElementById("messageinput");
const messagecontainer = document.querySelector(".container");
//  var audio = new Audio('ding.mp3')

//message container
const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messagecontainer.append(messageElement);
  //    if(position=='left'){ audio.play()}
};
// typing container
const appen = (n2, position) => {
  const typii = document.createElement("div");
  typii.innerText = n2;
  typii.classList.add("typing");
  typii.classList.add(position);
  // messageElement.classList.add(display)
  typ.append(typii);
  //    if(position=='left'){ audio.play()}
};
//message send
form.addEventListener("submit", (e) => {
  const scrollToBottom = (node) => {
    node.scrollTop = node.scrollHeight;
  };
  scrollToBottom(messagecontainer);
  e.preventDefault();
  const message = messageinput.value;
  append(`you: ${message}`, "right");
  socket.emit("send", message);
  messageinput.value = "";
});
//take name of the user
const Name = prompt("Write Your Nickname Here");
const n2 = Name.toLowerCase();
if (Name.length <= 3) {
  alert("Not Accepted Nickname Should be greater than 3 words");
  history.back();
}
if (Name.length >= 12) {
  alert("Not Accepted Pls Write Your Nickname Here");
  history.back();
}
var maxLength = 12;
var userData = -1;

while (userData == -1 || (userData != null && userData.length > maxLength)) {
  userData = Name;
  socket.emit("new-user-joined", Name);
}

// user joined the chat notify
socket.on("user-joined", (Name) => {
  append(`${Name} joined the chat`, "right");
});

//user leave the chat
socket.on("left", (Name) => {
  append(`${Name}: left the chat`, "left");
});

//message recive
socket.on("receive", (data) => {
  const scrollToBottom = (node) => {
    node.scrollTop = node.scrollHeight;
  };
  scrollToBottom(messagecontainer);
  append(`${data.Name}:${data.message}`, "left");
});

//typing information recieve
socket.on("type-receive", (n2) => {
  typ.style.display = "block";
  if ((typ.style.display = "block")) {
    setTimeout(function () {
      typ.style.display = "none";
    }, 1000);
  }
  const scrollToBottom = (node) => {
    node.scrollTop = node.scrollHeight;
  };
  scrollToBottom(typ);
  appen(`${n2}: is typing...`);
});

//typing information send
messageinput.addEventListener("input", (f) => {
  socket.emit("send-typing", n2);
});
