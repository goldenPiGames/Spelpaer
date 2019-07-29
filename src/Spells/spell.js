const SPELLS = [];

var Spell = {
	__proto__ : BattleAction,
	known : false,
	isSpell : true,
	usesWeapon : false,
	usesArmor : false,
	/*getDamage : function(attacker, defender, primary) {
		var pow = this.power;
		var eff = defender.getEffectiveness(this.attribute);
		var lvl = this.level;
		var atk = attacker.getStat(this.attackStat);
		var def = defender.getStat(this.defenseStat);
		var dmg = pow * eff * lvl * 2 * atk / (atk + def);
		return dmg;
	},*/
	damageInflection : 1.0,
	getDescription : function() {
		var desc = this.name + " : level " + this.level + ", costs " + this.cost;
		if (this.power)
			desc += " <br> Power: " + this.power + " " + this.attribute + " (" + this.attackStat + " vs. " + this.defenseStat + (this.damageInflection != 1.0 ? ", damage inflection "+this.damageInflection+")" : ")");
		if (this.hitrate) {
			desc += " <br> Hitrate: " + asPercent(this.hitrate, 0)
			if (this.hitrate < 1.0)
				desc += " (" + this.accuracyStat + " vs " + this.evasionStat + ")";
		}
		desc += " <br> " + this.flavor;
		return desc;
	},
	isPreparable : function() {
		//console.log(this.known, (this.level <= player.level))
		return this.known && (this.level <= player.level);
	},
	isAvailable : function() {
		return !this.used;
	},
	expend : function() {
		this.used = true;
	},
	getKeyStat : function() {
		if (this.attackStat == "Intelligence") return "Intelligence";
		if (this.attackStat == "Wisdom") return "Wisdom";
		if (this.attackStat == "Charisma") return "Charisma";
		if (this.accuracyStat == "Intelligence") return "Intelligence";
		if (this.accuracyStat == "Wisdom") return "Wisdom";
		if (this.accuracyStat == "Charisma") return "Charisma";
		if (this.effectAccuracyStat == "Intelligence") return "Intelligence";
		if (this.effectAccuracyStat == "Wisdom") return "Wisdom";
		if (this.effectAccuracyStat == "Charisma") return "Charisma";
	},
	purchase : function() {
		this.known = true;
	},
	canBeBought : function() {
		return !this.known;
	},
	shouldAutoPrepare : function() {
		return true;
	}
}

/*class SpellC extends BattleActionC {
	constructor(level) {
		this.level = level;
	}
	known = false;
	isSpell = true;
	usesWeapon = false;
	usesArmor = false;
	damageInflection = 1.0;
	getDescription () {
		var desc = this.name + " : level " + this.level + ", costs " + this.cost;
		if (this.power)
			desc += " <br> Power: " + this.power + " " + this.attribute + " (" + this.attackStat + " vs. " + this.defenseStat + (this.damageInflection != 1.0 ? ", damage inflection "+this.damageInflection+")" : ")");
		if (this.hitrate) {
			desc += " <br> Hitrate: " + asPercent(this.hitrate, 0)
			if (this.hitrate < 1.0)
				desc += " (" + this.accuracyStat + " vs " + this.evasionStat + ")";
		}
		desc += " <br> " + this.flavor;
		return desc;
	}
	isPreparable () {
		//console.log(this.known, (this.level <= player.level))
		return this.known && (this.level <= player.level);
	}
	isAvailable () {
		return !this.used;
	}
	expend () {
		this.used = true;
	}
	getKeyStat () {
		if (this.attackStat == "Intelligence") return "Intelligence";
		if (this.attackStat == "Wisdom") return "Wisdom";
		if (this.attackStat == "Charisma") return "Charisma";
		if (this.accuracyStat == "Intelligence") return "Intelligence";
		if (this.accuracyStat == "Wisdom") return "Wisdom";
		if (this.accuracyStat == "Charisma") return "Charisma";
		if (this.effectAccuracyStat == "Intelligence") return "Intelligence";
		if (this.effectAccuracyStat == "Wisdom") return "Wisdom";
		if (this.effectAccuracyStat == "Charisma") return "Charisma";
	}
	getKeyStat : function() {
		if (this.attackStat == "Intelligence") return "Intelligence";
		if (this.attackStat == "Wisdom") return "Wisdom";
		if (this.attackStat == "Charisma") return "Charisma";
		if (this.accuracyStat == "Intelligence") return "Intelligence";
		if (this.accuracyStat == "Wisdom") return "Wisdom";
		if (this.accuracyStat == "Charisma") return "Charisma";
		if (this.effectAccuracyStat == "Intelligence") return "Intelligence";
		if (this.effectAccuracyStat == "Wisdom") return "Wisdom";
		if (this.effectAccuracyStat == "Charisma") return "Charisma";
	}
	purchase () {
		this.known = true;
	}
	canBeBought () {
		return !this.known;
	}
	shouldAutoPrepare () {
		return true;
	}
}*/

/*var Favor = {
	__proto__ : Spell,
	name : "Favor",
	flavor : "Imbue with minor fortune.",
	source : "Start game with Divine specialization.",
	attack : false,
	level : 10,
	attribute : "positive",
	
	effectRate : 1.0,
	effectAccuracyStat : "Wisdom",
	effectEvasionStat : "Wisdom",
	effectStat : "Strength",
	effectAmount : 5,
	effectDuration : 600,
	delay : 80,
	cost : 6,
	execute : executeBuff
}; SPELLS.push(Favor);*/

function Frighten(user) {
	this.user = user;
}; SPELLS.push(Frighten);
Frighten.prototype = Object.create(Spell);
Frighten.prototype.name = "Frighten";
Frighten.prototype.flavor = "The target is frightened and forced to flee from battle, but only if it has low enough hit points.";
Frighten.prototype.attack = true;
Frighten.prototype.level = 10;
Frighten.prototype.power = 20;
Frighten.prototype.attribute = "fear";
Frighten.prototype.hitrate = 1.0;
Frighten.prototype.attackStat = "Charisma";
Frighten.prototype.defenseStat = "Charisma";
Frighten.prototype.delay = 80;
Frighten.prototype.cost = 5;
Frighten.prototype.execute = function(user, target) {
	var dmg = this.getDamage(user, target);
	//var hit = (Math.random() < this.getHitrate(user, target));
	if (target.hp <= dmg) {
		target.die("Fled");
	} else {
		target.dodge(0);
	}
}

/*var Distract = {
	__proto__ : Spell,
	name : "Distract",
	flavor : "Distract a target with conflicting thoughts, slightly lowering its Dexterity.",
	source : "Start game with Psionic specialization.",
	attack : false,
	level : 10,
	attribute : "mind",
	
	effectRate : 0.8,
	effectAccuracyStat : "Charisma",
	effectEvasionStat : "Wisdom",
	effectStat : "Dexterity",
	effectAmount : -4,
	effectDuration : 600,
	delay : 80,
	cost : 6,
	execute : executeBuff
}; SPELLS.push(Distract);*/

function ReadStats(user) {
	this.user = user;
}; SPELLS.push(ReadStats);
ReadStats.prototype = Object.create(Spell);
ReadStats.prototype.name = "Read Stats";
ReadStats.prototype.flavor = "Quickly tells you the stats of one enemy.";
ReadStats.prototype.level = 1;
ReadStats.prototype.attack = false;
ReadStats.prototype.delay = 25;
ReadStats.prototype.cost = 2;
ReadStats.prototype.execute = function(user, target) {
	var statsList = ["Vitality", "Strength", "Constitution", "Dexterity", "Agility", "Intelligence", "Wisdom", "Charisma", "Potential", "Weapon", "Armor"];
	messageList = [];
	for (var i = 0; i < statsList.length; i++) {
		messageList.push(new DialogLine("Read Stats", null, statsList[i] + ": Normally " + target[statsList[i]] + ", currently " + target.getStat(statsList[i]) + "."));
	}
	dialog.begin(messageList);
}

/*var ReadEffectiveness = {
	__proto__ : Spell,
	name : "Read Effectiveness",
	flavor : "Quickly tells you the effectiveness of all attributes against one enemy.",
	source : "Ask the Explainer about how damage is calculated.",
	attack : false,
	known : false,
	level : 1,
	delay : 20,
	cost : 1,
	execute : function(user, target, battle) {
		user.expendSpell(this);
		var effectiveness = target.effectiveness;
		messageList = [];
		for (var prop in effectiveness) {
			messageList.push(new DialogLine("Read Effectiveness", null, prop + ": " + asPercentage(effectiveness[prop])));
        }
		return messageList;
	},
	price : 1000
}; SPELLS.push(ReadEffectiveness);*/

/*var WaterBreathing = {
	__proto__ : Spell,
	name : "Water Breathing",
	flavor : "Allows you to travel through underwater paths. Once cast, it lasts the entire day.",
	source : "Obtained from Wilsid in Innsport after rescuing him.",
	attack : false,
	normallyPrepared : false,
	
	level : 1,
	attribute : "water",
	hitrate : 1.0,
	
	effectStat : "waterbreathing",
	effectAmount : 1,
	effectDuration : Infinity,
	delay : 40,
	cost : 15,
	execute : executeMassBuff,
	shouldAutoPrepare : function() {
		return (currentLoc.prepareWaterBreathing);
	}
}; SPELLS.push(WaterBreathing);*/

/*var Delet = {
	__proto__ : Spell,
	name : "Delet",
	flavor : "delet this",
	source : "This is a spell that lets me instantly kill things while playtesting. If you're playing this, don't use this spell.",
	attack : true,
	known : false,
	level : Infinity,
	delay : 20,
	cost : Infinity,
	execute : function(user, target, battle) {
		target.die("deleted");
	},
	animate : function() { }
}*/
//console.log("barm")
