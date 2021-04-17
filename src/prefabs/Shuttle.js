class Shuttle extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, frame, pointValue, timeValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to existing scene
        this.points = pointValue; //store point value
        this.moveSpeed = game.settings.spaceshipSpeed * .75; //pixels per frame, moves faster
        this.moreTime = timeValue;
    }

    update(){
        this.moveSpeed = game.settings.spaceshipSpeed;
        // move shuttle down
        this.y += this.moveSpeed;
        //put back at green border
        if(this.y > game.config.height) {
            this.reset();
        }
    }

    //position reset
    reset() {
        this.x = Phaser.Math.Between((game.config.width/1.25) - borderUISize*2 - borderPadding, borderPadding + borderUISize*2);
        this.y = borderUISize*4;
    }

}