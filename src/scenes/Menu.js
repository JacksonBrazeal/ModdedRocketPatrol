class Menu extends Phaser.Scene {
    constructor() {
            super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.image('mainmenu', './assets/mainmenu.png');
      }

    create(){
            //load main menu png
            this.mainmenu = this.add.tileSprite(0,0,game.config.width,game.config.height, 'mainmenu').setOrigin(0,0);

            // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 2.75,
            gameTimer: 75000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 3.5,
            gameTimer: 50000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
      }
      
} 