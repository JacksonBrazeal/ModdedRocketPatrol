class Shuttle extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to existing scene
        this.points = pointValue; //store point value
        this.moveSpeed = game.settings.spaceshipSpeed * 1.25; //pixels per frame, moves faster
    }

    update(){
        // move shuttle down
        this.y += this.moveSpeed;
        //wrap around from left to right edge
        if(this.y > 480) {
            this.reset();
        }
    }

    //position reset
    reset() {
        this.x = Phaser.Math.Between(20, 600);
        this.y = borderUISize*4;
        console.log("its just constantly resetting");
    }

}