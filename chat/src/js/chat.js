"use strict"

const socket=io();
const nickname = document.querySelector("#nickname");
const chatlist = document.querySelector(".chatting-list");
const chatinput = document.querySelector(".chatting-input");
const sendbutton = document.querySelector(".send-button");
const displaycontainer=document.querySelector(".display-container")
sendbutton.addEventListener("click",()=>{
    const param = {
        name : nickname.value,
        msg : chatinput.value
    };
    socket.emit("chatting",param);
});

socket.on("chatting",(data)=>{
    const {name,msg,time} = data;
    const item=new LiModel(name,msg,time);
    item.makeLi();
    displaycontainer.scrollTo(0,displaycontainer.scrollHeight);
});

function LiModel(name,msg,time){
    this.name=name;
    this.msg=msg;
    this.time=time;

    this.makeLi = ()=>{
        const li =document.createElement("li");
        li.classList.add(nickname.value ===this.name ? "sent" : "received");
        const dom=`<span class="profile">
        <span class="user">${this.name}</span>
        <img class="image" src="https://placeimg.com/50/50/any" alt="any">
    </span>
    <span class="message">${this.msg}</span>
    <span class="time">${this.time}</span>`;
        li.innerHTML=dom;
        chatlist.appendChild(li);
    };
}