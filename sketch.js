// add your code here

var player1,database;
var position,position2,player2,p1animation,p2animation;
var player1Score,player2Score
var gameState=0;

function preload (){
    p1animation=loadAnimation("assests/player1a.png","assests/player1b.png","assests/player1a.png")
    p2animation=loadAnimation("assests/player2a.png","assests/player2b.png","assests/player2a.png")

}
function setup(){
    database=firebase.database();
    createCanvas(600,600);
    player1=createSprite(150,250,10,10);
    
    player1.addAnimation("walking",p1animation);
    p1animation.frameDelay=200;
    player1.scale=0.5;
    player1.setCollider("circle",0,0,60)
    player1.debug=true;


var player1Position=database.ref('player1/position')
player1Position.on("value",readPosition,showError)

player2=createSprite(450,250,10,10);

player2.addAnimation("walking2",p2animation);
p2animation.frameDelay=200;
player2.scale=-0.5;
player2.setCollider("circle",0,0,60)
player2.debug=true;


var player2Position=database.ref('player2/position')
player2Position.on("value",readPosition2,showError)

gameState=database.ref("gameState/");
gameState.on("value",readGS,showError);
player1Score=database.ref("player1Score/");
player1Score.on("value",readScore1,showError);

player2Score=database.ref("player2Score/");
player2Score.on("value",readScore2,showError);


}
function draw(){
background("white");

if(gameState===0){
    textAlign(CENTER)
    text ("press space to start toss",300,300);

    if(keyDown("space")){
        database.ref('player1/position').update({
            x:150,
            y:300
        })
        database.ref("player2/position").update({
            x:450,
            y:300
        })
        rand=Math.round(random(1,2));
        if(rand===1){
            database.ref('/').update({
                gameState:1
            })
            alert ("red ride ")
        }
        if(rand===2){
            database.ref('/').update({
                gameState:2
            })
            alert ("yellow ride")
        }
        
    }
}

if (gameState===1){
    if(keyDown(LEFT_ARROW)){
        writePosition(-5,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(5,0)
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-5);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,5);
    }
    else if(keyDown("w")){
        writePosition2(0,-5);
    }
    else if(keyDown("s")){
        writePosition2(0,5);
    }

    if(player1.x>500){
        database.ref('/').update({
            gameState:0,
            player1Score:player1Score+5,
            player2Score:player2Score-5,
           
        })
      alert("RED WON")
    }
    if(player1.isTouching(player2)){
        database.ref('/').update({
            gameState:0,
            player1Score:player1Score-5,
            player2Score:player2Score+5,
            
        })
        alert("red lost");
    
        }
    }



    if(gameState===2){
        if(keyDown("a")){
            writePosition2(-5,0);
        }
        else if(keyDown("d")){
            writePosition2(5,0)
        }
        else if(keyDown("w")){
            writePosition2(0,-5)
        }
        else if(keyDown("s")){
            writePosition2(0,5)
        }
        else if(keyDown("UP_ARROW")){
            writePosition(0,-5)
        }
        else if(keyDown("DOWN_ARROW")){
            writePosition(0,5)
        }
        if(player2.x<150){
            database.ref('/').update({
                gameState:0,
                player1Score:player1Score-5,
                player2Score:player2Score+5,
                
            })
            alert("yellow won")
        }

if(player2.isTouching(player1)){
    database.ref('/').update({
        gameState:0,
        player1Score:player1Score+5,
        player2Score:player2Score-5,
        
    })
    alert("Yellow lost");

    }
}
textSize(15);
text("RED:"+player1Score,350,15)
text("YELLOW:"+player2Score,150,15)
drawLine();
drawLine1();
drawLine2();
drawSprites();

}



    


function writePosition(x,y){
    database.ref('player1/position').set({
        x:position.x+x,
        y:position.y+y
    })
}
function writePosition2(x,y){
    database.ref('player2/position').set({
        x:position2.x+x,
        y:position2.y+y
    })
}
function readPosition(data){
    position=data.val();
    player1.x=position.x,
    player1.y=position.y
}
function readPosition2(data1){
    position2=data1.val();
    player2.x=position2.x,
    player2.y=position2.y
}
function readGS(data){
gameState=data.val();

}

function readScore1(data1){
player1Score=data1.val();
}
function readScore2(data2){
    player2Score=data2.val();
 }
 function showError(){
     console.log("Error")
 }
function drawLine(){
    for(var i=0;i<600;i=i+20){
        line(300,i,300,i+10)
    }
}
function drawLine1(){
    for(var i=0;i<600;i=i+20){
        stroke ("yellow");
        strokeWeight(4);
        line(100,i,100,i+10)
    }
}
function drawLine2(){
    for(var i=0;i<600;i=i+20){
        stroke ("red");
        strokeWeight(4);
       

        line(500,i,500,i+10)
    }
}





