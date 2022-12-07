/**
 * Variables used during the game.
 */
let player;
let enemy;
let cursors;

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
  this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, "sky");

  // playet setup
  player = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT, "player");
  player.setX((SCREEN_WIDTH - player.width * PLAYER_SCALE) / 2);
  player.setY(SCREEN_HEIGHT - (player.height * PLAYER_SCALE) / 2);
  player.setScale(PLAYER_SCALE);
 

  // enemy setup
  enemy = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT, "enemy");
  enemy.setX((SCREEN_WIDTH - enemy.width * ENEMY_SCALE) / 2);
  enemy.setY((enemy.height * ENEMY_SCALE) / 2);
  enemy.setScale(ENEMY_SCALE);

  //cursors map into game engine
  cursors = this.input.keyboard.createCursorKeys();
}

/**
 * Updates each game object of the scene.
 */
function update() {
  
function moverPlayer()
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