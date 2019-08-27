const SPELLS = [];

class Spell extends BattleAction {
	getDescription(user) {
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
	}
	isPreparable() {
		//console.log(this.known, (this.level <= player.level))
		return this.known && (this.level <= player.level);
	}
	estimateMaxCooldownTime(user) {
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
	}
	getCDDesc(user) {
		var cd = Math.ceil(this.cooldown / user.stats[this.cooldownStat]);
		if (this.isAvailable())
			return "";
		else if (cd >= Infinity)
			return "-";
		else
			return getShortDuration(cd);
	}
	getKeyStat() {
		return this.attackStat || this.accuracyStat || this.cooldownStat;
	}
	purchase() {
		this.known = true;
	}
	canBeBought() {
		return !this.known;
	}
	shouldAutoPrepare() {
		return true;
	}
}
Spell.prototype.known = false;
Spell.prototype.isTechnique = false;
Spell.prototype.isSpell = true;
Spell.prototype.usesWeapon = false;
Spell.prototype.usesArmor = false;
Spell.prototype.maxCooldown = Infinity;


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

class Frighten extends Spell {
	constructor() {
		super();
	}
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
