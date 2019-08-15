const SPELLS = [];

var Spell = {
	__proto__ : BattleAction,
	known : false,
	isTechnique : false,
	isSpell : true,
	usesWeapon : false,
	usesArmor : false,
	getDescription : function(user) {
		var desc = this.name + " : level " + this.level + ", costs " + this.cost;
		desc += " <br> Delay: " + this.delay;
		if (this.maxCooldown == Infinity)
			desc += "; Ticket";
		else if (this.maxCooldown)
			desc += "; Cooldown: " + this.maxCooldown + "/" + STAT_NAMES[this.cooldownStat] + " (~" + this.estimateMaxCooldownTime(user) + ")";
		else
			desc += "; Cooldown: None";
		if (this.power)
			desc += " <br> Power: " + this.power + " " + ATTRIBUTE_NAMES[this.attribute] + " (" + STAT_NAMES[this.attackStat] + (this.usesWeapon?" + Weapon":"") + " vs. " + STAT_NAMES[this.defenseStat] + (this.usesArmor?" + Armor":"") + (this.damageInflection != 1.0 ? ", damage inflection "+this.damageInflection+")" : ")");
		if (this.hitrate) {
			desc += " <br> Hitrate: " + asPercent(this.hitrate, 0)
			if (this.hitrate < 1.0)
				desc += " (" + STAT_NAMES[this.accuracyStat] + " vs " + STAT_NAMES[this.evasionStat] + ")";
		}
		if (this.effect) {
			var fect = new this.effect(this);
			desc += " <br> Effect: " + fect.getDescription();
		}
		desc += " <br> " + this.flavor;
		return desc;
	},
	isPreparable : function() {
		//console.log(this.known, (this.level <= player.level))
		return this.known && (this.level <= player.level);
	},
	estimateMaxCooldownTime : function(user) {
		var divisor;
		if (user) {
			divisor = user.stats[this.cooldownStat];
		} else if (player.stats) {
			divisor = player.stats[this.cooldownStat];
		} else if (player.level) {
			divisor = player.level;
		} else {
			divisor = this.level;
		}
		var time = this.maxCooldown / divisor;
		return getShortDuration(time);
	},
	getCDDesc : function(user) {
		var cd = Math.ceil(this.cooldown / user.stats[this.cooldownStat]);
		if (this.isAvailable())
			return "";
		else if (cd >= Infinity)
			return "-";
		else
			return getShortDuration(cd);
		/*else if (cd >= MINUTES)
			return Math.floor(this.cooldown/MINUTES)+"m";
		else
			return Math.floor(this.cooldown/SECONDS)+"s";*/
	},
	getKeyStat : function() {
		return this.attackStat || this.accuracyStat || this.cooldownStat;
	},
	purchase : function() {
		this.known = true;
	},
	canBeBought : function() {
		return !this.known;
	},
	shouldAutoPrepare : function() {
		return true;
	},
	maxCooldown : Infinity,
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
		if (this.attackStat == STAT_INDICES.Intelligence) return STAT_INDICES.Intelligence;
		if (this.attackStat == STAT_INDICES.Wisdom) return STAT_INDICES.Wisdom;
		if (this.attackStat == STAT_INDICES.Charisma) return STAT_INDICES.Charisma;
		if (this.accuracyStat == STAT_INDICES.Intelligence) return STAT_INDICES.Intelligence;
		if (this.accuracyStat == STAT_INDICES.Wisdom) return STAT_INDICES.Wisdom;
		if (this.accuracyStat == STAT_INDICES.Charisma) return STAT_INDICES.Charisma;
		if (this.effectAccuracyStat == STAT_INDICES.Intelligence) return STAT_INDICES.Intelligence;
		if (this.effectAccuracyStat == STAT_INDICES.Wisdom) return STAT_INDICES.Wisdom;
		if (this.effectAccuracyStat == STAT_INDICES.Charisma) return STAT_INDICES.Charisma;
	}
	getKeyStat : function() {
		if (this.attackStat == STAT_INDICES.Intelligence) return STAT_INDICES.Intelligence;
		if (this.attackStat == STAT_INDICES.Wisdom) return STAT_INDICES.Wisdom;
		if (this.attackStat == STAT_INDICES.Charisma) return STAT_INDICES.Charisma;
		if (this.accuracyStat == STAT_INDICES.Intelligence) return STAT_INDICES.Intelligence;
		if (this.accuracyStat == STAT_INDICES.Wisdom) return STAT_INDICES.Wisdom;
		if (this.accuracyStat == STAT_INDICES.Charisma) return STAT_INDICES.Charisma;
		if (this.effectAccuracyStat == STAT_INDICES.Intelligence) return STAT_INDICES.Intelligence;
		if (this.effectAccuracyStat == STAT_INDICES.Wisdom) return STAT_INDICES.Wisdom;
		if (this.effectAccuracyStat == STAT_INDICES.Charisma) return STAT_INDICES.Charisma;
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
	effectAccuracyStat : STAT_INDICES.Wisdom,
	effectEvasionStat : STAT_INDICES.Wisdom,
	effectStat : STAT_INDICES.Strength,
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
Frighten.prototype.power = 15;
Frighten.prototype.attribute = ATTRIBUTE_INDICES.fear;
Frighten.prototype.hitrate = 1.0;
Frighten.prototype.damageInflection = 0.5;
Frighten.prototype.attackStat = STAT_INDICES.Charisma;
Frighten.prototype.defenseStat = STAT_INDICES.Charisma;
Frighten.prototype.delay = 80;
Frighten.prototype.maxCooldown = 1500;
Frighten.prototype.cooldownStat = STAT_INDICES.Wisdom;
Frighten.prototype.cost = 3;
Frighten.prototype.execute = function(user, target) {
	var dmg = this.getDamage(user, target);
	if (target.hp <= dmg) {
		target.flee();
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
	attribute : "thought",
	
	effectRate : 0.8,
	effectAccuracyStat : STAT_INDICES.Charisma,
	effectEvasionStat : STAT_INDICES.Wisdom,
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
ReadStats.prototype.delay = 45;
ReadStats.prototype.maxCooldown = 100;
ReadStats.prototype.cooldownStat = STAT_INDICES.Intelligence;
ReadStats.prototype.cost = 1;
ReadStats.prototype.execute = function(user, target) {
	var statsList = [STAT_INDICES.Vitality, STAT_INDICES.Strength, STAT_INDICES.Constitution, STAT_INDICES.Dexterity, STAT_INDICES.Agility, STAT_INDICES.Intelligence, STAT_INDICES.Wisdom, STAT_INDICES.Charisma, STAT_INDICES.Weapon, STAT_INDICES.Armor];
	messageList = [];
	for (var i = 0; i < statsList.length; i++) {
		messageList.push(new DialogLine("Read Stats", null, STAT_NAMES[statsList[i]] + ": Normally " + target.stats[statsList[i]] + ", currently " + target.getStat(statsList[i]) + "."));
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
