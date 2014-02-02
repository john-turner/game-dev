exports.InputHandler = function(){
	var inputControllers = [];
	var currentInputController;

	this.addInputController = function(InputController){
		var index = inputControllers.indexOf(InputController);	
		if(index > -1){
			return;
		}
		inputControllers.push(InputController);
		if(!currentInputController){
			currentInputController = InputController;
		}
	};

	this.removeInputController = function(InputController){
		if(currentInputController == InputController){
			this.switchInputController();
		}

		var index = inputControllers.indexOf(InputController);		
		if(inputControllers.length == 1){
			inputControllers = [];
			currentInputController = null;
		}
		else if (index > -1) {
		    inputControllers.splice(index, 1);
		}
	};

	this.switchInputController = function(){
		var index = inputControllers.indexOf(currentInputController);
		var notNull = index != -1;
		var notNullOrFirstIndex = index > 0;
		var notLastIndex = inputControllers.length - 1 != index;
		if (notNull && notLastIndex) {
		    currentInputController = inputControllers[index + 1];
		}		
		else if(notNullOrFirstIndex){
			currentInputController = inputControllers[0];	
		}
	}

	this.handleInput = function(){
		if(currentInputController != null){
			currentInputController.update();
		}	
	};

};	



