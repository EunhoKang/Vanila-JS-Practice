const express=require("express");   //require로 모듈을 가져온다. 
const app=express();                //express 객체 생성
const path=require("path");
const http=require("http");
const server=http.createServer(app);//서버 생성.
const socketIO=require("socket.io");
const io=socketIO(server);          //
const moment=require("moment");

app.use(express.static(path.join(__dirname,"src"))); 
//"scr"라는 이름의 디렉토리에 포함된 이미지, CSS 파일 및 JavaScript 파일을 제공
//path.join으로 현재 좌표와 scr라는 폴더의 경로를 이어붙인다. 운영체제마다 이어붙이는 방식이 다르기 때문.
const PORT=process.env.PORT || 5000; //프로세스 환경에 포트가 지정되어 있으면 그것을 사용하고 아니면 5000번 사용

io.on('connection',(socket)=>{
    socket.on("chatting",(data)=>{
        const {name,msg}=data;
        io.emit("chatting",{
            name,
            msg,
            time: moment(new Date()).format("h:ss A")
        });
    });
});

server.listen(PORT,() => console.log(`server is running ${PORT}`));

