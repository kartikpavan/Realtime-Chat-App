const socket = io()
let username;
let textarea = document.getElementById('text-area')
let messageArea = document.querySelector('.message-area')

do {
  username = prompt('Enter Your Name')
} while (!username)
//key press EVENT indicate which char was entered while Keyup/Keydown which key is pressed
textarea.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') { //when pressed 
    sendMessage(e.target.value) //pass value of the entered key
  }
})

function sendMessage(message) {
  let msg = {
    user: username,
    message: message.trim()
  }
  //append message
  appendMessage(msg, 'outgoing')
  textarea.value = ''
  scrollToBottom()
  //send message to server
  socket.emit('message', msg) // we are emiting the 'message' event to the server
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement('div')
  let className = type
  mainDiv.classList.add(className, 'message') //' <-- here  message is the class name'
  //OR 
  // document.createElement('div').classList.add(type,'message') //' <-- here  message is the class name'
  mainDiv.innerHTML = `<h4>${msg.user}</h4> <p> ${msg.message}</p>`
  messageArea.appendChild(mainDiv)
  scrollToBottom()
}

//Recieve message
socket.on('message', (msg) => {
  appendMessage(msg, 'incoming')
})

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight
}