var socket = io();

const form = document.getElementById('send-form')
const typ = document.getElementById('typing')
const messageinput = document.getElementById('messageinput')
const messagecontainer = document.querySelector('.container')
//  var audio = new Audio('ding.mp3')
const append = (message, position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    // messageElement.classList.add(display)
    messagecontainer.append(messageElement);
//    if(position=='left'){ audio.play()}

}




form.addEventListener('submit', (e)=>{
    const scrollToBottom = (node) => {
        node.scrollTop = node.scrollHeight;
    }
    scrollToBottom(messagecontainer);
    e.preventDefault();
    const message = messageinput.value;
    append(`you: ${message}`, 'right')
    socket.emit('send',message)
    messageinput.value = '';
   

    
})


const Name = prompt("Write Your Name In Under 7 Words");
const n2 = Name.toLowerCase();
if (Name.length <= 3) {
    alert('Not Accepted Pls Write Your Correct Name')
    history.back()
}
if (Name.length >= 8) {
    alert('Not Accepted Pls Write Your Name Under 7 Words')
    history.back()
}
var maxLength = 7;
var userData = -1;

while (userData == -1 || (userData != null && userData.length > maxLength)) {
    userData = Name;
    socket.emit("new-user-joined",Name);
   
}




socket.on('user-joined', Name =>{
    append(`${Name} joined the chat` ,'right')
})


socket.on('left', Name =>{
    append(`${Name}: left the chat` ,'left')
})




socket.on('receive', data =>{
    const scrollToBottom = (node) => {
        node.scrollTop = node.scrollHeight;
    }
    scrollToBottom(messagecontainer);
    append(`${data.Name}:${data.message}` ,'left')
})
 socket.on('type-receive', inp =>{
   
        const typii = document.getElementById('typing')
     typii.style.display = 'block'
     const scrollToBottom = (node) => {
        node.scrollTop = node.scrollHeight;
    }
    scrollToBottom(typii);

    if (typii.style.display = 'block') {
       
        setTimeout(function(){
             typii.innerHTML = "";
        typii.style.display = 'none'
       
       }, 7000);
        
 }

    typ.append(`${inp.typingg}`)

   
    
 })

 messageinput.addEventListener('input', (f)=>{
   
   const typingg = typ.innerText = `  ${n2}: is typing...\n`
 
    //  append(`you: ${typingg}`, 'left')
    socket.emit('send-typing', typingg)
    // messageinput.value = '';
  
    
})
