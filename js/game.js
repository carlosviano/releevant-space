/**
 * Variables used during the game.
 */
let player;
let enemy;
let cursors;
let background;
let background2;
let spaceBar;
const bullets = [];
let contBullets = 0;
let frame = -1;
let enemyX;
let enemyY;
let scoreText;
let score = 0;
let contador = -1;
let enemies = []
let tiempo = 0;

/**
 * It prelaods all the assets required in the game.
 */
function preload() {
  this.load.image("sky", "assets/backgrounds/blue.png");
  this.load.image("player", "assets/characters/player.png");
  this.load.image("enemy", "assets/characters/alien1.png");
}

/**
 * It creates the scene and place the game objects.
 */
function create() {
  // scene background
  background = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 , "sky");
  background2 = this.add.image(SCREEN_WIDTH / 2, (SCREEN_HEIGHT/ 2 - 1024), "sky")
 

  // playet setup
  player = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT, "player");
  player.setX((SCREEN_WIDTH - player.width * PLAYER_SCALE) / 2);
  player.setY(SCREEN_HEIGHT - (player.height * PLAYER_SCALE) / 2);
  player.setScale(PLAYER_SCALE);
 

  // enemy setup
  spawnEnemy(this)
  //cursors map into game engine
  cursors = this.input.keyboard.createCursorKeys();

  // map space key status
  spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  
 scoreText = this.add.text(5, 5, `Score:${score}`, {
  fill: "#0095DD",
});

}

/**
 * Updates each game object of the scene.
 * 
 */
 //Texto Score

function update() {
moverPlayer()
moverFondo()
console.log(tiempo)
tiempo++ ;
if(tiempo > 800){
  spawnEnemy(this)
  tiempo = 0;
}
 if(frame < 0){
 disparar(this)
 }
 
 if(contBullets > 0){
  moverBala()
 }
 frame -- ;
 contador --;   

}

//Funciones enemigo

function spawnEnemy(engine){
  for(i = -2; i < 2; i++){
    enemy = engine.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT, "enemy");
    enemy.setX((SCREEN_WIDTH - enemy.width * ENEMY_SCALE + i * enemy.width) / 2);
    enemy.setY((enemy.height * ENEMY_SCALE) / 2);
    enemy.setScale(ENEMY_SCALE);
    enemies.push(enemy)
  }
}

function moverEnemigos(){
  
}

//puntuacion

function puntuacion(){
  contador = 11
  score += 1
  scoreText.setText("Score: " + score)
}

function moverBala(){
  let index = -1;
  for(let i = 0; i < bullets.length; i++){
    bullets[i].setY(bullets[i].y - BULLET_VELOCITY)
    if(bullets[i].y < 0 ){
      bullets[i].destroy()
      index = i
    };
    collision(bullets[i],enemies)
  };
  if(index >= 0 ){
    bullets.splice(index, 1)
  }
}


function collision(bala,enemies){
  let index = 0; 
  while(index < enemies.length){
    if((bala.x>=enemies[index].x-(enemies[index].width*ENEMY_SCALE)/2 && bala.x<=enemies[index].x+(enemies[index].width*ENEMY_SCALE)/2)&&
    (bala.y>=enemies[index].y-(enemies[index].height*ENEMY_SCALE)/2 && bala.y<=enemies[index].y+(enemies[index].height*ENEMY_SCALE)/2)){
      if(contador < 0){
        puntuacion()
      }
      enemies[index].destroy()
      enemies.splice(index,1)
      bala.destroy()
    }
    index ++
  }
}

function disparar(engine){
  if(spaceBar.isDown){
    bullets.push(engine.add.ellipse(player.x, player.y - player.height / 2 * PLAYER_SCALE - 5 ,4,4,0xFfff00))
    contBullets++
    frame = 25
  }
}
function moverFondo(){
  background.setY(background.y + BACKGROUND_VELOCITY)
  background2.setY(background2.y + BACKGROUND_VELOCITY)

  if(background.y > background.height + SCREEN_HEIGHT / 2) //1324PX
  {
    background.setY(background2.y - background.height)
  }

  let temporal = background
  background = background2
  background2 = temporal
}

function moverPlayer(){
  if (cursors.left.isDown && player.x !== 0) {

    player.setX(player.x - PLAYER_VELOCITY)
    if(player.x < (player.width / 2) * PLAYER_SCALE){
      player.x = player.width / 2 * PLAYER_SCALE;
    }

  } else if (cursors.right.isDown){
    
    player.setX(player.x + PLAYER_VELOCITY)
    if(player.x > SCREEN_WIDTH - (player.width / 2) * PLAYER_SCALE){
      player.x = SCREEN_WIDTH -(player.width / 2 * PLAYER_SCALE)}}

  if(cursors.up.isDown ){

    player.setY(player.y - PLAYER_VELOCITY)
    if(player.y < (player.height / 2) * PLAYER_SCALE){
      player.y = player.height / 2 * PLAYER_SCALE}

  } else if(cursors.down.isDown){
    player.setY(player.y + PLAYER_VELOCITY)
    if(player.y > SCREEN_HEIGHT - (player.height / 2) * PLAYER_SCALE){
      player.y = SCREEN_HEIGHT - (player.height / 2 * PLAYER_SCALE)}
  }
}