var assert = require("assert");
var inputModule = require("../game/input.js");

describe('Input', function(){
  describe('#InputHandler()', function(){
    it('Test InputHandler Construction', function(){
    	var inputHandler = new inputModule.InputHandler();
    })
  })
});

var createTestController = function(){
	var testController = {
    		updateCalled : 0,
    		update : function(){
    			this.updateCalled++;
    		}
    	};
    return testController;
}

describe('Input', function(){
  describe('#addInputController()', function(){
    it('Test adding a controller.', function(){
    	var inputHandler = new inputModule.InputHandler();
    	
    	var testController = {
    		updateCalled : 0,
    		update : function(){
    			this.updateCalled++;
    		}
    	};

    	inputHandler.addInputController(testController);
    	inputHandler.handleInput();
    	assert.equal(testController.updateCalled, 1);
    	inputHandler.handleInput();
    	assert.equal(testController.updateCalled, 2);

    })
  })
});

describe('Input', function(){
  describe('#addInputController()', function(){
    it('Test adding multiple controllers', function(){
    	var inputHandler = new inputModule.InputHandler();
    	
    	var testController1 = createTestController();
    	var testController2 = createTestController();
    	var testController3 = createTestController();

    	inputHandler.addInputController(testController1);
    	inputHandler.addInputController(testController2);
    	inputHandler.addInputController(testController3);

    	inputHandler.handleInput();
    	assert.equal(testController1.updateCalled, 1);
    	assert.equal(testController2.updateCalled, 0);
    	assert.equal(testController3.updateCalled, 0);
    })
  })
});

describe('Input', function(){
  describe('#switchInputController()', function(){
    it('Test switching controllers', function(){
    	var inputHandler = new inputModule.InputHandler();
    	
    	var testController1 = createTestController();
    	var testController2 = createTestController();
    	var testController3 = createTestController();

    	inputHandler.addInputController(testController1);
    	inputHandler.addInputController(testController2);
    	inputHandler.addInputController(testController3);

    	inputHandler.handleInput();
    	assert.equal(testController1.updateCalled, 1);
    	inputHandler.switchInputController();
    	inputHandler.handleInput();
    	assert.equal(testController2.updateCalled, 1);
    	inputHandler.switchInputController();
    	inputHandler.handleInput();
    	inputHandler.handleInput();
    	assert.equal(testController3.updateCalled, 2);
    	inputHandler.switchInputController();
    	inputHandler.handleInput();
    	assert.equal(testController1.updateCalled, 2);

    })
  })
});

describe('Input', function(){
  describe('#removeInputController()', function(){
    it('Test removing controllers', function(){
    	var inputHandler = new inputModule.InputHandler();
    	
    	var testController1 = createTestController();
    	var testController2 = createTestController();
    	var testController3 = createTestController();

    	inputHandler.addInputController(testController1);
    	inputHandler.addInputController(testController2);
    	inputHandler.addInputController(testController3);

    	inputHandler.handleInput();
    	assert.equal(testController1.updateCalled, 1);
    	inputHandler.removeInputController(testController1);
    	inputHandler.handleInput();
    	assert.equal(testController2.updateCalled, 1);
    	inputHandler.removeInputController(testController2);
    	inputHandler.handleInput();
    	assert.equal(testController3.updateCalled, 1);
    	inputHandler.removeInputController(testController3);
    	inputHandler.handleInput();
    	inputHandler.handleInput();
    	assert.equal(testController1.updateCalled, 1);
    	assert.equal(testController2.updateCalled, 1);
    	assert.equal(testController3.updateCalled, 1);

    })
  })
});