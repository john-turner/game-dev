var assert = require("assert");
var game = require("../game/game.js");

describe('Game', function(){
  describe('#Game()', function(){
    it('Test Game Construction', function(){
    	var testGame = game.Game();
    })
  })
})



var Vehicle = function(name, speed){
	this.name = name;
	this.speed = speed;

	this.saySpeed = function(){
		return "speed: " + speed;
	}
}

Vehicle.prototype.getName = function(){
	return this.name + "is the name";
}

Vehicle.prototype.getSpeed = function(){
	return this.speed + "is the name";
}

var Car = function(name, speed, doors){
	Vehicle.apply(this, [name, speed]);
	this.doors = doors;
}


Car.prototype = new Vehicle(); // make Student inherit from a Person object
Car.prototype.constructor = Car;


describe('TestInheritance', function(){
  describe('#Vehicle()', function(){
    it('Test Inheritance', function(){
    	var mustang = new Car('mustang', 100, 4);
    	console.log(mustang.getName());
    	console.log(mustang.saySpeed());
  })
})
})
