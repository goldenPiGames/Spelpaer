const TECHNIQUES = [];

class Technique extends BattleAction {
	constructor(level) {
		super();
		this.level = level;
		this.power = this.powerMult * this.level;
		this.maxCooldown = this.cooldownMult * this.level;
	}
	/*getDescription() {
		var desc = this.name + " lv. " + this.level;
		desc += " <br> Delay: " + this.delay;
		if (this.maxCooldown)
			desc += "; Cooldown: " + this.maxCooldown + "/" + STAT_NAMES[this.cooldownStat];
		else
			desc += "; Cooldown: None";
		if (this.power)
			desc += " <br> Power: " + this.power + " " + (this.attribute == WEAPON_ATTRIBUTE ? "weapon's" : ATTRIBUTE_NAMES[this.attribute]) + " (" + STAT_NAMES[this.attackStat] + (this.usesWeapon?" + Weapon":"") + " vs. " + STAT_NAMES[this.defenseStat] + (this.usesArmor?" + Armor":"") + (this.damageInflection != 1.0 ? ", damage inflection "+this.damageInflection+")" : ")");
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
	}*/
}
Technique.prototype.known = false;
Technique.prototype.isTechnique = true;
Technique.prototype.isSpell = false;
Technique.prototype.attackStat2 = STAT_INDICES.Weapon
Technique.prototype.defenseStat2 = STAT_INDICES.Armor;

class BasicAttack extends Technique {
	constructor(level) {
		super(level);
	}
}; TECHNIQUES.push(BasicAttack);
BasicAttack.prototype.name = "Attack";
BasicAttack.prototype.flavor = "The most basic combat technique.";
BasicAttack.prototype.attack = true;
BasicAttack.prototype.powerMult = 1.0;
BasicAttack.prototype.attribute = WEAPON_ATTRIBUTE;
BasicAttack.prototype.hitrate = 0.75;
BasicAttack.prototype.attackStat = STAT_INDICES.Strength;
BasicAttack.prototype.attackStat2 = STAT_INDICES.Weapon;
BasicAttack.prototype.defenseStat = STAT_INDICES.Constitution;
BasicAttack.prototype.defenseStat2 = STAT_INDICES.Armor;
BasicAttack.prototype.accuracyStat = STAT_INDICES.Dexterity;
BasicAttack.prototype.evasionStat = STAT_INDICES.Agility;
BasicAttack.prototype.delay = 100;
BasicAttack.prototype.cooldownMult = 0;
BasicAttack.prototype.cooldownStat = STAT_INDICES.Constitution;
BasicAttack.prototype.isAvailable = function() {
	return true;
},
BasicAttack.prototype.cooldownPortion = function() {
	return 1.0;
},
BasicAttack.prototype.prerequisites = [];

class CastersResort extends Technique {
	constructor(level) {
		super(level);
	}
};// TECHNIQUES.push(CastersResort);
CastersResort.prototype.name = "Caster's Resort";
CastersResort.prototype.flavor = "When a spellcaster has nothing to do. Recharges all spells a tiny bit.";
CastersResort.prototype.attack = true;
CastersResort.prototype.powerMult = 0.5;
CastersResort.prototype.attribute = WEAPON_ATTRIBUTE;
CastersResort.prototype.hitrate = 0.75;
CastersResort.prototype.attackStat = STAT_INDICES.Strength;
CastersResort.prototype.attackStat2 = STAT_INDICES.Weapon;
CastersResort.prototype.defenseStat = STAT_INDICES.Constitution;
CastersResort.prototype.defenseStat2 = STAT_INDICES.Armor;
CastersResort.prototype.accuracyStat = STAT_INDICES.Dexterity;
CastersResort.prototype.evasionStat = STAT_INDICES.Agility;
CastersResort.prototype.delay = 90;
CastersResort.prototype.cooldownMult = 0;
CastersResort.prototype.cooldownStat = STAT_INDICES.Intelligence;
CastersResort.prototype.isAvailable = function() {
	return true;
},
CastersResort.prototype.cooldownPortion = function() {
	return 1.0;
},
CastersResort.prototype.prerequisites = [];
//TODO add spell recharge effect

class CastersResortEffect extends Effect {
	apply(user, target, dmg) {
		user.spells.forEach(sp=>sp.cooldown=Math.max(0, sp.cooldown-this.level*15));
	}
}

class PowerChop extends Technique {
	constructor(level) {
		super(level);
	}
	/*animate : function(user, target, battle) {
		var x = target.animationX();
		var y = target.animationY();
		for(var i = 0; i < 22; i++) {
			let direction = randomDirection();
			let speed = i/4 + 2 * Math.random();
			let shade = 64 + 128 * Math.random();
			let color = rgb(shade, shade, shade);
			let dx = Math.cos(direction) * speed;
			let dy = Math.sin(direction) * speed;
			engine.particles.push(new Ember(x, y, dx, dy, 3, color, .025));
		}
	},*/
}; TECHNIQUES.push(PowerChop);
PowerChop.prototype.name = "Power Chop";
PowerChop.prototype.flavor = "A more powerful two-handed attack.";
PowerChop.prototype.attack = true;
PowerChop.prototype.powerMult = 1.5;
PowerChop.prototype.attribute = ATTRIBUTE_INDICES.cutting;
PowerChop.prototype.hitrate = 0.6;
PowerChop.prototype.attackStat = STAT_INDICES.Strength;
PowerChop.prototype.attackStat2 = STAT_INDICES.Weapon;
PowerChop.prototype.defenseStat = STAT_INDICES.Constitution;
PowerChop.prototype.defenseStat2 = STAT_INDICES.Armor;
PowerChop.prototype.accuracyStat = STAT_INDICES.Dexterity;
PowerChop.prototype.evasionStat = STAT_INDICES.Agility;
PowerChop.prototype.delay = 120;
PowerChop.prototype.cooldownMult = 200;
PowerChop.prototype.cooldownStat = STAT_INDICES.Constitution;
PowerChop.prototype.prerequisites = [BasicAttack];

class Cleave extends Technique {
	constructor(level) {
		super(level);
	}
	/*animate : function(user, target, battle) {
		var x = target.animationX();
		var y = target.animationY();
		for(var i = -12; i < 8; i++) {
			let ty = y - 25 + 50 * Math.random();
			let shade = 64 + 128 * Math.random();
			let color = rgb(shade, shade, shade);
			let dx = (i + 4 * Math.random()) * 0.7;
			engine.particles.push(new Ember(x, y - 10 + 20*Math.random(), dx, 0, 3, color, .02));
		}
	},*/
}; TECHNIQUES.push(Cleave);
Cleave.prototype = Object.create(Technique);
Cleave.prototype.name = "Cleave";
Cleave.prototype.flavor = "A sideways strike that also hits enemies to either side of the main target.";
Cleave.prototype.attack = true;
Cleave.prototype.powerMult = 0.9;
Cleave.prototype.attribute = ATTRIBUTE_INDICES.cutting;
Cleave.prototype.splash = 0.6;
Cleave.prototype.hitrate = 0.65;
Cleave.prototype.attackStat = STAT_INDICES.Strength;
Cleave.prototype.attackStat2 = STAT_INDICES.Weapon;
Cleave.prototype.defenseStat = STAT_INDICES.Constitution;
Cleave.prototype.defenseStat2 = STAT_INDICES.Armor;
Cleave.prototype.accuracyStat = STAT_INDICES.Dexterity;
Cleave.prototype.evasionStat = STAT_INDICES.Agility;
Cleave.prototype.delay = 120;
Cleave.prototype.cooldownMult = 250;
Cleave.prototype.cooldownStat = STAT_INDICES.Constitution;
//Cleave.prototype.execute = executeSplashAttack;
Cleave.prototype.prerequisites = [BasicAttack];

/*function InfinitySlash(level, user) {
	__proto__ : Technique,
	name : "Infinity Slash",
	flavor : "A mighty sideways slash so powerful it could cleave the entire world in twain",
	attack : true,
	powerMult : 5.0,
	attribute : "slashing",
	hitrate : 0.5,
	attackStat : STAT_INDICES.Strength,
	defenseStat : STAT_INDICES.Constitution,
	accuracyStat : STAT_INDICES.Dexterity,
	evasionStat : STAT_INDICES.Agility,
	delay : 200,
	cooldownMult : 2000,
	cooldownStat : "Potential",
	execute : executeLineAttack,
	animate : function(user, target, battle) {
		var y = target.animationY();
		for(var x = 130; x < 670; x+=10) {
			let ty = y - 25 + 50 * Math.random();
			let color = randomTerm(["#00DDFF", "#FFFF00", "#CC0011", "#BB00FF", "#00FF77", "#FF8800"]);
			let dx = randomN(7);
			let dy = randomN(4);
			engine.particles.push(new Ember(x, y - 10 + 20*Math.random(), dx, dy, 3, color, .02));
		}
	},
	
	skillCost : 20,
	prerequisites : [Cleave]
}; TECHNIQUES.push(InfinitySlash);
InfinitySlash.prototype = Object.create(Technique);
.prototype.name = "";
.prototype.flavor = ".";
.prototype.attack = true;
.prototype.powerMult = ;
.prototype.hitrate = ;
.prototype.attackStat = STAT_INDICES.Strength;
.prototype.attackStat2 = STAT_INDICES.Weapon;
.prototype.defenseStat = STAT_INDICES.Constitution;
.prototype.defenseStat2 = STAT_INDICES.Armor;
.prototype.accuracyStat = STAT_INDICES.Dexterity;
.prototype.evasionStat = STAT_INDICES.Agility;
.prototype.delay = ;
.prototype.cooldownMult = ;
.prototype.prerequisites = [];*/

class QuickStab extends Technique {
	constructor(level) {
		super(level);
	}
}; TECHNIQUES.push(QuickStab);
QuickStab.prototype = Object.create(Technique);
QuickStab.prototype.name = "Quick Stab";
QuickStab.prototype.flavor = "A fast and accurate but weak attack.";
QuickStab.prototype.attack = true;
QuickStab.prototype.powerMult = 0.6;
QuickStab.prototype.attribute = ATTRIBUTE_INDICES.piercing;
QuickStab.prototype.hitrate = 0.85;
QuickStab.prototype.attackStat = STAT_INDICES.Strength;
QuickStab.prototype.attackStat2 = STAT_INDICES.Weapon;
QuickStab.prototype.defenseStat = STAT_INDICES.Constitution;
QuickStab.prototype.defenseStat2 = STAT_INDICES.Armor;
QuickStab.prototype.accuracyStat = STAT_INDICES.Dexterity;
QuickStab.prototype.evasionStat = STAT_INDICES.Agility;
QuickStab.prototype.delay = 65;
QuickStab.prototype.cooldownMult = 200;
QuickStab.prototype.cooldownStat = STAT_INDICES.Agility;
QuickStab.prototype.prerequisites = [BasicAttack];
