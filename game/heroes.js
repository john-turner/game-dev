var status = require('status.js');


exports.getHeroes = function(){
	var heroes = Array();

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
	this.attackers = attacker || [];
	this.effects = effects || [];
	this.callback = callback || function(){};
}

var unitID = 0;

exports.Unit = function(){
	this.unitID = unitID++;
	this.name = '';
	this.hp = 0;
	this.attack = 0;
	this.charge = 0;
	this.mana = 0;

	this.turn = false;
	this.status = status.UnitStatus.NORMAL;
	
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