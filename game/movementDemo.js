var input = require('./input.js');

var game;  
var launchGame = function(){
game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
} 

function preload() {
    game.load.image('star', 'images/star.png');
}

var menuText;
var draftText;
var button;

function create() {    
	var text = "Movement Type: ";
    var style = { font: "40px Arial", fill: "#ff0044", align: "center" };
    menuText = game.add.text(game.world.centerX, 50, text, style);
	
	var text = "Switch Movement Type With M key.";
    var style = { font: "25px Arial", fill: "#ff0044", align: "center" };
    draftText = game.add.text(game.world.centerX, 100, text, style);
   
    menuText.anchor.setTo(0.5, 0.5);
    draftText.anchor.setTo(0.5, 0.5);
    draftText.visible = false;
    var inputHandler = new input.InputHandler();
    console.log(inputHandler);
}


function update() {

}

launchGame();