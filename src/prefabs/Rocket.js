//const { Phaser } = require("../../lib/phaser");

// Rocket player pre fabricated object 
class Rocket extends Phaser.GameObjects.Sprite{
    constructor (scene, x, y, texture, frame) {
        super(scene,x,y,texture,frame);

        //add object to the existing scene
        scene.add.existing(this);
        this.isFiring = false; //track rocket firing status
        this.moveSpeed = 2; //pixels per frame
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    update() {
        //left and right movement (only can move left now)
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed;
        }
        //else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
        //    this.x += this.moveSpeed;
        //}
    }
    //fire button
    if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
        }
        
        //when fired

        // if key left is held move left
        if(this.isFiring &&  keyLEFT.isDown && this.y >= borderUISize * 3 + borderPadding && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed;
        }

        //if key right is held move right
        // if(this.isFiring &&  keyRIGHT.isDown && this.y >= borderUISize * 3 + borderPadding && this.x <= game.config.width - borderUISize - this.width ) {
        //this.x += this.moveSpeed;
        //}

        // if nothing else, move the rocket up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    // reset rocket to "ground"
    reset() {
        this.isFiring = false;
        this.x = game.config.width - borderUISize - borderPadding;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}