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



