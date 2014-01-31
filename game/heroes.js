var status = require('./status.js');


exports.getHeroes = function(){
	var heroes = Array();
	console.log('here');
	for(var i = 0; i < 15; i++){
		heroes.push(buildUnit(undeadSheet, randomPowerFunction, 'undead', i));
		heroes.push(buildUnit(classMenSheet, randomPowerFunction, 'class', i));
		heroes.push(buildUnit(humansSheet, randomPowerFunction, 'human', i));
		heroes.push(buildUnit(monsterSheet1, randomPowerFunction, 'monster', i));	
	}
	return heroes;
}

var undeadSheet = "dg_undead32.gif";
var classMenSheet = "dg_classm32.gif";
var humansSheet = "dg_humans32.gif";
var monsterSheet1 = "dg_monster132.gif";
var monsterSheet2 = "dg_monster232.gif";
var monsterSheet3 = "dg_monster332.gif";
var monsterSheet4 = "dg_monster432.gif";

var randomPowerFunction = function(unit){
	var hp = Math.floor(Math.random() * 40) + 10;
	var mp = Math.floor(Math.random() * 40) + 10;
	var str = Math.floor(Math.random() * 10) + 1
	var agi = Math.floor(Math.random() * 10) + 1;
	var intel = Math.floor(Math.random() * 10) + 1;
	unit["hp"] = hp;
	unit["mp"] = mp;
	unit["str"] = str;
	unit["agi"] = agi;
	unit["intel"] = intel;
}

var buildUnit = function(spriteSheet, powerFunction, baseName, frameSpot){
	var unit = {};
	powerFunction(unit);
	unit['name'] = baseName + frameSpot;
	unit['image'] = spriteSheet;
	unit['frame'] = frameSpot;
	return unit;
}

exports.DamageInfo = function(damageAmount, attacker, effects, callback){
	this.damageAmount = damageAmount || 0;
	this.attacker = attacker || [];
	this.effects = effects || [];
	this.callback = callback || function(){};
}

var unitID = 0;

exports.Unit = function(name, hp, attack, charge, mana){
	this.unitID = unitID++;
	this.name = name;
	var hp = hp;
	var attack = attack;
	var charge = charge;
	var mana = mana

	this.turn = false;
	this.status = status.UnitStatus.NORMAL;
	
	this.__defineGetter__("hp", function(){
		return hp;
	})
	this.__defineSetter__("hp", function(val){
		hp = val;
	})
	this.__defineGetter__("attack", function(){
		return attack;
	})
	this.__defineSetter__("attack", function(val){
		attack = val;
	})
	this.__defineGetter__("charge", function(){
		return charge;
	})
	this.__defineSetter__("charge", function(val){
		charge = val;
	})
	this.__defineGetter__("mana", function(){
		return mana;
	})
	this.__defineSetter__("mana", function(val){
		mana = val;
	})


	this.isDead = function(){
		return hp === 0;
	}

	this.damage = function(damageInfo){
		this.hp -= damageInfo.damageAmount;
		var effects = damageInfo.effects;
		for(var i = 0; i < effects.length; i++){

		}
		damageInfo.callback();	
	}




}