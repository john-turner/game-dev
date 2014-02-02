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



},{}]},{},[1])