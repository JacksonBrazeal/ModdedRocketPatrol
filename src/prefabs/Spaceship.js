
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, timeValue, randomNumber){
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to existing scene
        this.points = pointValue; //store point value
        this.moveSpeed = game.settings.spaceshipSpeed; //pixels per frame
        this.moreTime = timeValue;
        this.directionValue =  randomNumber; //if it's one, it goes left, if its two, it goes Right (backwards)
    }


    update(){
        this.moveSpeed = game.settings.spaceshipSpeed;

        if(this.directionValue == 1){
            // move spaceship left
            this.x -= this.moveSpeed;
            //wrap around from left to right edge
                if(this.x <= 0 - this.width) {
                this.reset();
            }
        }
        else{
            //move spaceship right
            this.x += this.moveSpeed;
            //wrap around from right to left edge (backwards)
            if(this.x >= game.config.width){
                this.reset();
            }
        }
    }

    //position reset
    reset() {
        if(this.directionValue==1){

        this.x = game.config.width; //start at right said, else start at left.
        }
        else {
            this.x = 0 - borderUISize * 2;
        }
    }
}