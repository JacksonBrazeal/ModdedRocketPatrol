class Play extends Phaser.Scene {
    constructor() {
            super("playScene");
    }

    // init(), preload(), create(), update()

    preload() {
            //load images/ tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('greenborder', './assets/greenborder.png');
        this.load.image('bottomborder', './assets/bottomborder.png');
        this.load.image('sideborder', './assets/sideborder.png');
        this.load.image('topborder', './assets/topborder.png');
        this.load.image('shuttle', './assets/shuttle.png');
        this.load.audio("blammed", './assets/blammed.mp3');
        //load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })
    }

    create(){

        this.sound.play('blammed');

        //place starfield
        this.starfield = this.add.tileSprite(0,0,game.config.width,game.config.height, 'starfield').setOrigin(0,0);

        //green rectangle UI background
        this.add.tileSprite(borderPadding * 3, borderUISize + borderPadding, game.config.width, borderUISize * 1.5, 'greenborder').setOrigin(0,0);

        //new borders
        this.add.tileSprite(0,0,game.config.width, borderUISize, 'topborder').setOrigin(0,0); //top
        this.add.tileSprite(0,0,borderUISize, game.config.height, 'sideborder').setOrigin(0,0); //left
        this.add.tileSprite(game.config.width - borderUISize, 0 , borderUISize, game.config.height, 'sideborder').setOrigin(0,0); //right
        this.add.tileSprite(0,game.config.height-borderUISize ,game.config.width, borderUISize, 'bottomborder').setOrigin(0,0); //bottom



        //add rocket (Player 1)
        this.p1Rocket = new Rocket(this, game.config.width - borderUISize - borderPadding, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        //add spaceships x3 and shuttle x1
        this.ship01 = new Spaceship(this, game.config.width + borderUISize *6, borderUISize*4, 'spaceship', 0, 30, 1500, Phaser.Math.Between(1,2)).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize *3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20, 1000, Phaser.Math.Between(1,2)).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10, 500, Phaser.Math.Between(1,2)).setOrigin(0,0);
        this.shuttle01 = new Shuttle(this, Phaser.Math.Between(this.width + 20, this.width - 20), borderUISize*4, 'shuttle', 0, 15, 500).setOrigin(0,0);

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation config
        this.anims.create({
            key: 'explode',  
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });

        // initialize score
        this.p1Score =0;

         // display score
         let scoreConfig = {
        fontFamily: 'Impact',
        fontSize: '28px',
        backgroundColor: '#00FF00',
         color: '#843605',
         align: 'right',
         padding: {
         top: 5,
        bottom: 5,
     },
    fixedWidth: 100
  }
  this.scoreLeft = this.add.text(borderUISize * 2, borderUISize + borderPadding*2, this.p1Score, scoreConfig);


  // GAME OVER flag
this.gameOver = false;

  // 60-second play clock
    scoreConfig.fixedWidth = 0;
    this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
    this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
    this.gameOver = true;
    }, null, this);

    //display clock

    let clockConfig = {
        fontFamily: 'Impact',
        fontSize: '28px',
        backgroundColor: '#00FF00',
         color: '#843605',
         align: 'left',
         padding: {
         top: 5,
        bottom: 5,
     },
    fixedWidth: 100
    }

    this.clockRight = this.add.text(game.config.width- borderUISize*5 - borderPadding, borderUISize + borderPadding*2, game.settings.gameTimer / 1000, clockConfig);

    //how UI text will look
    let UIConfig = {
        fontFamily: 'Impact',
        fontSize: '36px',
        backgroundColor: '#D5D5D5',
         color: '#454545',
         align: 'center',
         padding: {
         top: 2,
        bottom: 2,
     },
    fixedWidth: 200
    }

    //add UI text (the gray stuff)
    this.add.text(borderUISize * .5, borderPadding, 'SCORE', UIConfig).setOrigin(0,0);
    this.add.text(game.config.width - borderUISize * 7, borderPadding, 'CLOCK', UIConfig).setOrigin(0,0);

    //implement the speed increase (stars too)
    this.speedIncrease = this.time.delayedCall(30000, () => {
        game.settings.spaceshipSpeed = game.settings.spaceshipSpeed *1.25;
        starSpeed = starSpeed * 1.5;
    } , null, this);

}

    update(){

        //stop music if game over
        if (this.gameOver){
            this.sound.get('blammed').stop();
        }

    // check key input for restart
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
        this.scene.restart();
}
 //go to main menu
if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
    this.scene.start("menuScene");
}

//update the clock
var elapsed = game.settings.gameTimer - this.clock.getElapsed();
this.clockRight.text = elapsed/1000;

        this.starfield.tilePositionX -= starSpeed;

        //update spacehships 3 and rocket
        if(!this.gameOver){
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.shuttle01.update();
        }
        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket, this.shuttle01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.shuttle01);
        }
    }

    checkCollision(rocket, ship){
        //simple AABB checking
        if(rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height && 
            rocket.height + rocket.y > ship.y){

                return true;
        }   else {
            return false;
        }
    }
    
    shipExplode(ship) {
        // temporary hide ship
        ship.alpha = 0;
        //create explosion sprite at ships position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        })
         // score add and scrapped time mechanic
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;  
        this.sound.play('sfx_explosion');
        //game.settings.gameTimer += ship.moreTime;
    }
}
