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

//  const appen = (typin , positio)=>{
//      const typinElement = document.getElementById('typing')
//      // const typinElement = document.createElement('div')
//      typinElement.innerText = typin;
//      // typinElement.classList.add('typing');
//      typinElement.classList.add(positio)
//      messagecontainer.append(typinElement);
//      }


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
    
    // typ.innerText = Name + " :typing.."
    // const ty = 'typing...'
    if (typii.style.display = 'block') {
        setTimeout(function(){
        typii.style.display = 'none'
        typii.detach();
        
       }, 2000);
 }
//  if (typii.style.display = 'none') {
//     const typii = document.getElementById('typing')
//      typii.style.display = 'block'
//  }
    typ.append(`${inp.typingg}`)

   
    
 })




// function typing() {
//          const typingg = 'typing...'
//      messagecontainer.append(`${Name}: is ${typingg}`, 'left')
//       socket.emit('send-typing', typingg)
//       // messagecontainer.value = 'typing...'
//  }

 messageinput.addEventListener('input', (f)=>{
   
   const typingg = typ.innerText = `  ${Name}: is typing...\n`
 
    //  append(`you: ${typingg}`, 'left')
    socket.emit('send-typing', typingg)
    // messageinput.value = '';
  
    
})