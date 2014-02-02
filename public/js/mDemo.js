(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.InputHandler = function(){
	var inputControllers = [];
	var currentInputController;

	this.addInputController = function(InputController){
		inputControllers.push(InputController);
		if(!currentInputController){
			currentInputController = InputController;
		}
	};

	this.removeInputController = function(InputController){
		var index = inputControllers.indexOf(InputController);		
		if (index > -1) {
		    inputControllers.splice(index, 1);
		}
		if(currentInputController == currentInputController){
			if(inputControllers.length > 0){
				currentInputController = inputControllers[0]; 	
			}
		}	
	};

	this.handleInput = function(){
		currentInputController.update();	
	};

};	




},{}],2:[function(require,module,exports){
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
},{"./input.js":1}]},{},[2])