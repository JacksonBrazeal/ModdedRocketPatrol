//PROJECT BREAKDOWN:
//Jackson Brazeal
//This is Rocket Patrol Reverse, A mod where the aliens get back at humans for destroying all their ships.


//POINTS BREAKDOWN:
//Add your own Music - 5 points (It only stops one time)
//Create new Scrolling tile sprite for background - 5 points
// Allow player to control the rocket after its fired - 5 points.
//Increase Speed after 30 seconds - 5 points.
//Spaceships Spawn in random Direction each refresh - 5 points
// Fire Computer Text added - 5 points 
//Display time remaining on the screen - 10 points
// Replace the UI borders with new artwork - 10 points
// create a new title screen - 10 points
// create a new spaceship type -  20 points (it's the shuttle that moves vertically)
//create new artwork for all in game assets - 20 points

// Total: 100 points

//Other important notes:
//The player may only move left in this mod, and always resets on the right side of the screen. That was done purposefully to change up gameplay.
// I didn't do the SFX mod, that way I don't apply for the full 60 points in S tier, and can still use a sci fi theme. Loophole.
//The background music is from a video game, however the creator said it's okay to use, so it's technically copyright free.
// I tried to add time to the clock with every spaceship, but I couldn't get it to work properly. That's why the spaceships have a time variable that isn't used. I'm keeping it there if I feel like coming back to it.
//I couldn't find the Atari style font, so I hand drew "FIRE COMPUTER" pixel by pixel on the border background. It was painful.

//CITED SOURCES:
// Help with Clock: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/timer/
// Music: https://www.youtube.com/watch?v=aQ2tXk-2UEg


// game configuration
let config = {
    type: Phaser.CANVAS, 
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

//set ui sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let starSpeed = 3;

// reserve keyboard bindings
let keyF, keyR, keyLEFT, keyRIGHT;