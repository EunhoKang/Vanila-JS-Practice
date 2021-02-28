
let score=0;
let time=0;
let isPlaying=false;
let maxTime=3;
let buttonState=["게임 중...","게임 시작!"];
let typeTimer;

let randomWords=["Apple","Pear","Mellon","Peach"];

let wordInput;
let wordDisplay;
let scoreDisplay;
let TimeDisplay;
let button;

window.onload = function() { // html 로드 끝난 후 행
    wordInput=$("input");
    wordDisplay=$("display");
    scoreDisplay=$("score");
    TimeDisplay=$("time");
    button=$("gameButton");
    wordInput.observe("input",AnswerCheck);
    button.onclick=GameStart;
    buttonChange(isPlaying);
};

function AnswerCheck(){
    if(!isPlaying) return;
    if(wordInput.value === wordDisplay.innerText){
        score++;
        scoreDisplay.innerText=score;
        wordInput.value="";
        wordDisplay.innerText=randomWords[Math.floor(Math.random()*(randomWords.length-1))];
        TimeReset();
    }
}

function TimeReset(){
    time=maxTime;
    TimeDisplay.innerText=time;
}

function TimeCount(){
    if(time>0) time--;
    else{
        isPlaying=false;
        GameEnd();
    }
    TimeDisplay.innerText=time;
}

function GameStart(){
    if(isPlaying) return;
    isPlaying=true;
    score=0;
    scoreDisplay.innerText=score;
    wordInput.value="";
    wordDisplay.innerText=randomWords[Math.floor(Math.random()*(randomWords.length-1))];
    TimeReset();
    typeTimer=setInterval(TimeCount,1000);
    buttonChange(isPlaying);
}

function GameEnd(){
    clearInterval(typeTimer);
    buttonChange(isPlaying);
}

function buttonChange(playing){
    if(playing){
        button.innerText=buttonState[0];
        if(!button.classList.contains("loading")) button.classList.add("loading");
    }else {
        button.innerText=buttonState[1];
        if(button.classList.contains("loading")) button.classList.remove("loading");
    }
}