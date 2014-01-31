var assert = require("assert"),
	heroes = require("../game/heroes.js");

describe('Unit', function(){
  describe('#Unit()', function(){
    it('Test Unit Construction', function(){
    	var unit = new heroes.Unit("bob", 10, 2, 3, 0);
    	assert.equal('bob', unit.name);
    	assert.equal(10, unit.hp);
    	assert.equal(2, unit.attack);
    	assert.equal(3, unit.charge);
    	assert.equal(0, unit.mana);
    })
  })
})

describe('Unit', function(){
  describe('#isDead()', function(){
    it('Test is Dead function', function(){
    	var unit = new heroes.Unit("bob", 10, 2, 3, 0);
    	assert.equal(false, unit.isDead());
    	unit.hp = 0;
    	assert.equal(true, unit.isDead());
    })
  })
})

describe('DamageInfo', function(){
  describe('#DamageInfo()', function(){
    it('Test Damage Info Construction', function(){
    	var damageAmount = 10;
    	var attacker = new heroes.Unit("bob", 10, 2, 3, 0);
    	var effects = [];
    	var callback = function(err){
	        if (err) throw err;
      	};
    	var damageInfo = new heroes.DamageInfo(damageAmount, attacker, effects, callback);
    	assert.equal(damageInfo.damageAmount, damageAmount);
    	assert.equal(damageInfo.attacker.unitID, attacker.unitID);
    	assert.equal(damageInfo.effects, effects);
    	assert.equal(damageInfo.callback, callback);   	
    })
  })
})

describe('Unit', function(){
  describe('#damage()', function(){
    it('Test hero taking damage', function(){
    	var damageAmount = 10;
    	var attacker = new heroes.Unit("bob", 10, 2, 3, 0);
    	var effects = [];
    	var callback = function(err){
	        if (err) throw err;
      	};
    	var damageInfo = new heroes.DamageInfo(damageAmount, attacker, effects, callback);
    	var unit = new heroes.Unit("bob", 10, 2, 3, 0);
    	unit.damage(damageInfo);
    	assert.equal(0, unit.hp);
    })
  })
})


