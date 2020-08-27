const socket = io('/');
const form = document.getElementById('sendcontainer');
const inpmsg = document.getElementById('inpmsg');
const container = document.querySelector('.container');
let audio = new Audio('ting2.mp3');
let audio2 = new Audio('ting1.mp3');
const appendMessage = (message)=>{
    const msgelem = document.createElement('div');
    msgelem.classList.add('texts');
    msgelem.innerText = message;
    msgelem.style.backgroundColor = 'green';
    container.append(msgelem);
    audio2.play();
}
const appendOthersMessage = (message)=>{
    const msgelem = document.createElement('div');
    msgelem.classList.add('texts');
    msgelem.innerText = message;
    msgelem.classList.add('urchat');
    container.append(msgelem);
    audio.play();
}
const appendUrMessage = (message)=>{
    const msgelem = document.createElement('div');
    msgelem.classList.add('texts');
    msgelem.innerText = message;
    msgelem.classList.add('otherschat');
    container.append(msgelem);
}
const appendExitMessage = (message)=>{
    const msgelem = document.createElement('div');
    msgelem.classList.add('texts');
    msgelem.innerText = message;
    msgelem.style.backgroundColor = 'red';
    container.append(msgelem);
    audio2.play();
}

const name = prompt('Enter your name to join');
socket.emit('new-user-joined',name);
socket.on('user-joined',name =>{
    appendMessage(`${name} joined the chat`);
})
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = inpmsg.value;
    appendUrMessage(`You: ${message}`);
    socket.emit('send-message',message);
    inpmsg.value = "";
})
socket.on('recieve-message', data =>{
    appendOthersMessage(`${data.name}:${data.message}`)
})
socket.on('left', name =>{
    appendExitMessage(`${name} left the chat`);
});