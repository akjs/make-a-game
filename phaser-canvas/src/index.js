const Phaser = require('phaser-ce');

let player;
let monsters;
let cursors;
let score = 0;
let scoreText;

const preload = (game) => {
  game.load.image('hero', '../images/hero.png');
  game.load.image('bg', '../images/background.png');
  game.load.image('monster', '../images/monster.png');
};


const create = (game) => {
  //  We're going to be using physics, so enable the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);
  //  A simple background for our game
  game.add.sprite(0, 0, 'bg');


  player = game.add.sprite(32, game.world.height - 150, 'hero');

  //  We need to enable physics on the player
  game.physics.arcade.enable(player);
  monsters = game.add.group();

  //  We will enable physics for any star that is created in this group
  monsters.enableBody = true;
  const monster = monsters.create(32 + (Math.random() * (512 - 64)), 32 + (Math.random() * (480 - 64)), 'monster');
  cursors = game.input.keyboard.createCursorKeys();
  scoreText = game.add.text(32, 32, 'Goblins caught: 0', { fontSize: '24px', fill: '#FFF' });
};

const update = (game) => {
  // game.physics.arcade.collide(player, mosters);
  // Checks to see if the player overlaps with any of the stars,
  // if he does call the collectStar function

  game.physics.arcade.overlap(player, monsters, (_, monster) => {
    // Removes the star from the screen
    monster.kill();
    score += 1;
    scoreText.text = `Goblins caught: ${score}`;
    monsters.create(32 + (Math.random() * (512 - 64)), 32 + (Math.random() * (480 - 64)), 'monster');
  }, null, this);

  //  Reset the players velocity (movement)
  player.body.velocity.x = 0;
  if (cursors.left.isDown) {
    //  Move to the left
    player.body.velocity.x = -150;
    player.body.velocity.y = 0;
  } else if (cursors.right.isDown) {
    //  Move to the right
    player.body.velocity.x = 150;
    player.body.velocity.y = 0;
  } else if (cursors.up.isDown) {
    //  Move up
    player.body.velocity.y = -150;
    player.body.velocity.x = 0;
  } else if (cursors.down.isDown) {
    //  Move to the right
    player.body.velocity.y = 150;
    player.body.velocity.x = 0;
  } else {
    //  Stand still
    player.animations.stop();
    player.frame = 4;
  }
  //  Allow the player to jump if they are touching the ground.
  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -350;
  }
};

new Phaser.Game(512, 480, Phaser.AUTO, 'app', { preload, create, update });
