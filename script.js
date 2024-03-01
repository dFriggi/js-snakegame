let canvas = document.getElementById("snake")
let context = canvas.getContext("2d")//renderiza o desenho feito no canvas
/*sempre antes de desenhar, devemos selecionar a canvas
 e capturar o contexto gráfico da mesma, pelo metodo getContext(), da seguinte forma:*/
let box = 32
let snake = []
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = 'right';
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake(){
    for (i=0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x , snake[i].y, box, box);
    }
}

function createFood(){
    context.fillStyle = 'red'
    context.fillRect(food.x, food.y, box, box)
}

document.addEventListener('keydown', uptade);

function uptade (event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left'
    if(event.keyCode == 38 && direction != 'down') direction = 'up'
    if(event.keyCode == 39 && direction != 'left') direction = 'right'
    if(event.keyCode == 40 && direction != 'up') direction = 'down'
}

function startGame(){

    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0  && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0  && direction == "up") snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo)
            alert('GAME OVER')
        } 
    }

    createBG();
    createSnake();
    createFood()

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    let foodX = food.x;
    let foodY = food.y;


    if(direction == 'right') snakeX += box;
    if(direction == 'left') snakeX -= box;
    if(direction == 'up') snakeY -= box;
    if(direction == 'down') snakeY += box;

    if(snakeX != foodX || snakeY != foodY) {
        snake.pop();
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newhead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newhead);

}

let jogo = setInterval(startGame, 110);

