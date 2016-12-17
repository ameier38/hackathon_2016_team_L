console.log( activities );
var ctx = document.getElementById("ctx").getContext("2d");
ctx.font = '30px Arial';
var HEIGHT = 500;
var WIDTH = 500;
var timeWhenGameStarted = Date.now();   
 
var frameCount = 0;
 
var score = 0;
var user;
var nameList = {};
ctx.fillText(activities[0].scipted,10,50);

/* var ctx = document.getElementById("ctx").getContext("2d");
ctx.font = '30px Arial';
 
var HEIGHT = 500;
var WIDTH = 500;
var timeWhenGameStarted = Date.now();   //return time in ms
 
var frameCount = 0;
 
var score = 0;
var user;
var nameList = {};
var bulletList = {};
 
 
 function User(){
        var self = Actor('user','myId',50,40,30,5,20,20,'green',10,1);
       
        self.updatePosition = function(){
                if(self.pressingRight)
                        self.x += 10;
                if(self.pressingLeft)
                        self.x -= 10;  
                if(self.pressingDown)
                        self.y += 10;  
                if(self.pressingUp)
                        self.y -= 10;  
               
                //ispositionvalid
                if(self.x < self.width/2)
                        self.x = self.width/2;
                if(self.x > WIDTH-self.width/2)
                        self.x = WIDTH - self.width/2;
                if(self.y < self.height/2)
                        self.y = self.height/2;
                if(self.y > HEIGHT - self.height/2)
                        self.y = HEIGHT - self.height/2;
        };
        var super_update = self.update;
        self.update = function(){
                super_update();
                if(self.hp <= 0){
                        var timeSurvived = Date.now() - timeWhenGameStarted;           
                        startNewGame();
                }
        };
       
        self.pressingDown = false;
        self.pressingUp = false;
        self.pressingLeft = false;
        self.pressingRight = false;
        return self;
       
}
 
 function Entity (type,id,x,y,spdX,spdY,width,height,color){
        var self = {
                type:type,
                id:id,
                x:x,
                y:y,
                spdX:spdX,
                spdY:spdY,
                width:width,
                height:height,
                color:color,
        };
        self.update = function(){
                self.updatePosition();
                self.draw();
        };
        self.draw = function(){
                ctx.save();
                ctx.fillStyle = self.color;
                ctx.fillRect(self.x-self.width/2,self.y-self.height/2,self.width,self.height);
                ctx.restore();
        };
        self.getDistance = function(entity2){   //return distance (number)
                var vx = self.x - entity2.x;
                var vy = self.y - entity2.y;
                return Math.sqrt(vx*vx+vy*vy);
        };
 
        self.testCollision = function(entity2){ //return if colliding (true/false)
                var rect1 = {
                        x:self.x-self.width/2,
                        y:self.y-self.height/2,
                        width:self.width,
                        height:self.height,
                };
                var rect2 = {
                        x:entity2.x-entity2.width/2,
                        y:entity2.y-entity2.height/2,
                        width:entity2.width,
                        height:entity2.height,
                };
                return testCollisionRectRect(rect1,rect2);
               
        };
        self.updatePosition = function(){
                self.x += self.spdX;
                self.y += self.spdY;
                               
                if(self.x < 0 || self.x > WIDTH){
                        self.spdX = -self.spdX;
                }
                if(self.y < 0 || self.y > HEIGHT){
                        self.spdY = -self.spdY;
                }
        };
       
        return self;
}
 
  function Actor(type,id,x,y,spdX,spdY,width,height,color,hp,atkSpd){
        var self = Entity(type,id,x,y,spdX,spdY,width,height,color);
       
        self.hp = hp;
        self.atkSpd = atkSpd;
        self.attackCounter = 0;
        self.aimAngle = 0;
       
        var super_update = self.update;
        self.update = function(){
                super_update();
                self.attackCounter += self.atkSpd;
        };
       
        self.performAttack = function(){
                if(self.attackCounter > 25){    //every 1 sec
                        self.attackCounter = 0;
                        generateBullet(self);
                }
        };
       
        return self;
}

   function Name(id,x,y,spdX,spdY,width,height){
        var self = Actor('query',id,x,y,spdX,spdY,width,height,'red',10,1);
       
        var super_update = self.update;
        self.update = function(){
                super_update();
               
                var isColliding = user.testCollision(self);
                if(isColliding){
                        user.hp = user.hp - 1;
                }
        };
       
        nameList[id] = self;
}
 
  function randomlyGenerateName(){
        //Math.random() returns a number between 0 and 1
        var x = Math.random()*WIDTH;
        var y = Math.random()*HEIGHT;
        var height = 10 + Math.random()*30;     //between 10 and 40
        var width = 10 + Math.random()*30;
        var id = Math.random();
        var spdX = 5 + Math.random() * 5;
        var spdY = 5 + Math.random() * 5;
        Name(id,x,y,spdX,spdY,width,height);
       
}
  function Bullet (id,x,y,spdX,spdY,width,height){
        var self = Entity('bullet',id,x,y,spdX,spdY,width,height,'black');
       
        self.timer = 0;
       
        var super_update = self.update;
        self.update = function(){
                super_update();
                var toRemove = false;
                self.timer++;
                if(self.timer > 75){
                        toRemove = true;
                }
               
                for(var key2 in nameList){
                        
                        var isColliding = self.testCollision(enemyList[key2]);
                        if(isColliding){
                                toRemove = true;
                                delete nameList[key2];
                                break;
                        }      
                        
                }
                if(toRemove){
                        delete bulletList[self.id];
                }
        };
        bulletList[id] = self;
}
 
  function generateBullet  (actor,aimOverwrite){
        //Math.random() returns a number between 0 and 1
        var x = actor.x;
        var y = actor.y;
        var height = 10;
        var width = 10;
        var id = Math.random();
       
        var angle;
        if(aimOverwrite !== undefined)
                angle = aimOverwrite;
        else angle = actor.aimAngle;
       
        var spdX = Math.cos(angle/180*Math.PI)*5;
        var spdY = Math.sin(angle/180*Math.PI)*5;
        Bullet(id,x,y,spdX,spdY,width,height);
}
  function testCollisionRectRect(rect1,rect2){
        return rect1.x <= rect2.x+rect2.width
                && rect2.x <= rect1.x+rect1.width
                && rect1.y <= rect2.y + rect2.height
                && rect2.y <= rect1.y + rect1.height;
}
 
document.onclick = function(mouse){
        user.performAttack();
};
 
 
document.onmousemove = function(mouse){
        var mouseX = mouse.clientX - document.getElementById('ctx').getBoundingClientRect().left;
        var mouseY = mouse.clientY - document.getElementById('ctx').getBoundingClientRect().top;
       
        mouseX -= user.x;
        mouseY -= user.y;
       
        user.aimAngle = Math.atan2(mouseY,mouseX) / Math.PI * 180;
};
 
document.onkeydown = function(event){
        if(event.keyCode === 68)        //d
                user.pressingRight = true;
        else if(event.keyCode === 83)   //s
                user.pressingDown = true;
        else if(event.keyCode === 65) //a
                user.pressingLeft = true;
        else if(event.keyCode === 87) // w
                user.pressingUp = true;
};
 
document.onkeyup = function(event){
        if(event.keyCode === 68)        //d
                user.pressingRight = false;
        else if(event.keyCode === 83)   //s
                user.pressingDown = false;
        else if(event.keyCode === 65) //a
                user.pressingLeft = false;
        else if(event.keyCode === 87) // w
                user.pressingUp = false;
};
 
  function update(){
        ctx.clearRect(0,0,WIDTH,HEIGHT);
        frameCount++;
        score++;
       
        if(frameCount % 200 === 0)      //every 4 sec
                randomlyGenerateName();
       
       
       
        for(var key in bulletList){
                bulletList[key].update();
        }
       
        for(var key in nameList){
                nameList[key].update();
        }
       
        user.update();
       
        ctx.fillText(user.hp + " HP",0,30);
        ctx.fillText('Score: ' + score,200,30);
}
 
 function startNewGame (){
        user.hp = 10;
        user.atkSpd = 2.2;
        timeWhenGameStarted = Date.now();
        frameCount = 0;
        score = 0;
        nameList = {};
        bulletList = {};
        randomlyGenerateName();
       
}

user = User();
startNewGame();
 
setInterval(update,40);
 
*/
 
 
 