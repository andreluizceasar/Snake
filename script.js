
var gameUnit = 30;
var gamewidth = 750;
var gameHeight = 600;

class Snake{
    constructor(){
        this.unit = gameUnit;
        
        let exp = Math.pow(-1, Math.floor(Math.random()*2));
        let ran = Math.pow(-1, Math.floor(Math.random()*2));

        this.speed = {
            x:((ran-1)/2)*exp*this.unit,
            y:((ran+1)/2)*exp*this.unit
        }

        let min = 4;
        let cols = (gamewidth/this.unit)-2*min;
        let rows = (gameHeight/this.unit)-2*min;
        this.position = {
            x:(Math.floor(Math.random()*cols)+min)*this.unit,
            y:(Math.floor(Math.random()*rows)+min)*this.unit,
        }

        this.tail = [
            [this.position.x,this.position.y],
        ];
    }

    eatFood(){
        this.tail.unshift([this.position.x+this.speed.x,this.position.y+this.speed.y]);
    }

    drawSnake(ctx){
        ctx.fillStyle = '#F0FFFF';
        ctx.strokeStyle = '#bebebe';
        for(let i = 0;i<this.tail.length;i++){
            ctx.fillRect(this.tail[i][0], this.tail[i][1], this.unit, this.unit);
            ctx.strokeRect(this.tail[i][0], this.tail[i][1], this.unit, this.unit);
        }
    }

    update(){
        this.input();
        for(let i = 0;i<this.tail.length-1;i++){
            this.tail[i] = this.tail[i+1];
        }
        this.position.x+=this.speed.x;
        this.position.y+=this.speed.y;

        this.tail[this.tail.length-1] = [this.position.x,this.position.y];
    }

    input(){
        document.addEventListener("keydown",event=> {
        
            switch(event.keyCode){
                case 37://left
                    if(this.speed.x == 0){                     
                        this.speed.x = -this.unit;
                        this.speed.y = 0; 
                    }
                break;

                case 39://right
                    if(this.speed.x == 0){                      
                        this.speed.x = this.unit;
                        this.speed.y = 0; 
                    }
                break;

                case 38://up
                    if(this.speed.y == 0){                       
                        this.speed.x = 0;
                        this.speed.y = -this.unit; 
                    }
                break;

                case 40://down
                    if(this.speed.y == 0){                       
                        this.speed.x = 0;
                        this.speed.y = this.unit; 
                    }
                break;
                
            }
        });
    }

}

class Food{
    constructor(){
        this.unit = gameUnit;

        let cols = gamewidth/snake.unit;
        let rows = gameHeight/snake.unit;
        this.position = {
            x:Math.floor(Math.random()*cols)*snake.unit,
            y:Math.floor(Math.random()*rows)*snake.unit,
        }
    
    }

    drawFood(ctx){   
        ctx.fillStyle = '#A52A2A';
        ctx.fillRect(this.position.x, this.position.y, this.unit, this.unit);
    }  
}

let canvas = document.getElementById("GameCanvas");

let ctx = canvas.getContext('2d');

let snake = new Snake();

let food = new Food();

snake.drawSnake(ctx);

function gameLoop(){
    
    ctx.clearRect(0,0,gamewidth,gameHeight);
    
    food.drawFood(ctx);
    snake.update();
    snake.drawSnake(ctx);

    if(snake.position.x == food.position.x && snake.position.y == food.position.y){
        snake.eatFood();
        food = new Food();
    }

    for(let i = 0;i<snake.tail.length-1;i++){
        if(snake.position.x == snake.tail[i][0] && snake.position.y == snake.tail[i][1]){
            clearInterval(game);
        }
    }

    if(snake.position.x < 0 || snake.position.x == gamewidth || snake.position.y < 0 || snake.position.y == gameHeight){
        clearInterval(game);
    }

}

let game = setInterval(gameLoop,100);
