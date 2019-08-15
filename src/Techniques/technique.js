const TECHNIQUES = [];

var Technique = {
	__proto__ : BattleAction,
	known : false,
	isTechnique : true,
	isSpell : false,
	usesWeapon : true,
	usesArmor : true,
	getDescription : function() {
		var desc = this.name + " lv. " + this.level;
		desc += " <br> Delay: " + this.delay;
		if (this.maxCooldown)
			desc += "; Cooldown: " + this.maxCooldown + "/" + STAT_NAMES[this.cooldownStat];
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
}

function BasicAttack(level, user) {
	this.level = level;
	this.power = this.powerMult * this.level;
	this.user = user;
	this.attribute = this.user.weaponAttribute;
}; TECHNIQUES.push(BasicAttack);
BasicAttack.prototype = Object.create(Technique);
BasicAttack.prototype.name = "Attack";
BasicAttack.prototype.flavor = "The most basic combat technique.";
BasicAttack.prototype.attack = true;
BasicAttack.prototype.powerMult = 1.0;
BasicAttack.prototype.hitrate = 0.75;
BasicAttack.prototype.attackStat = STAT_INDICES.Strength;
BasicAttack.prototype.usesWeapon = true;
BasicAttack.prototype.defenseStat = STAT_INDICES.Constitution;
BasicAttack.prototype.usesArmor = true;
BasicAttack.prototype.accuracyStat = STAT_INDICES.Dexterity;
BasicAttack.prototype.evasionStat = STAT_INDICES.Agility;
BasicAttack.prototype.delay = 100;
BasicAttack.prototype.cooldownMult = 0;
BasicAttack.prototype.isAvailable = function() {
	return true;
},
BasicAttack.prototype.cooldownPortion = function() {
	return 1.0;
},
BasicAttack.prototype.prerequisites = [];

function PowerChop(level, user) {
	this.level = level;
	this.power = this.powerMult * this.level;
	this.maxCooldown = this.cooldownMult * this.level;
	this.user = user;
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
PowerChop.prototype = Object.create(Technique);
PowerChop.prototype.name = "Power Chop";
PowerChop.prototype.flavor = "A more powerful two-handed attack.";
PowerChop.prototype.attack = true;
PowerChop.prototype.powerMult = 1.5;
PowerChop.prototype.attribute = ATTRIBUTE_INDICES.cutting;
PowerChop.prototype.hitrate = 0.6;
PowerChop.prototype.attackStat = STAT_INDICES.Strength;
PowerChop.prototype.usesWeapon = true;
PowerChop.prototype.defenseStat = STAT_INDICES.Constitution;
PowerChop.prototype.usesArmor = true;
PowerChop.prototype.accuracyStat = STAT_INDICES.Dexterity;
PowerChop.prototype.evasionStat = STAT_INDICES.Agility;
PowerChop.prototype.delay = 120;
PowerChop.prototype.cooldownMult = 200;
PowerChop.prototype.cooldownStat = STAT_INDICES.Constitution;
PowerChop.prototype.prerequisites = [BasicAttack];

function Cleave(level, user) {
	this.level = level;
	this.power = this.powerMult * this.level;
	this.maxCooldown = this.cooldownMult * this.level;
	this.user = user;
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
	prerequisites : [BasicAttack]
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
Cleave.prototype.usesWeapon = true;
Cleave.prototype.defenseStat = STAT_INDICES.Constitution;
Cleave.prototype.usesArmor = true;
Cleave.prototype.accuracyStat = STAT_INDICES.Dexterity;
Cleave.prototype.evasionStat = STAT_INDICES.Agility;
Cleave.prototype.delay = 120;
Cleave.prototype.cooldownMult = 250;
Cleave.prototype.cooldownStat = STAT_INDICES.Constitution;
//Cleave.prototype.execute = executeSplashAttack;
Cleave.prototype.prerequisites = [];

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
.prototype.usesWeapon = true;
.prototype.defenseStat = STAT_INDICES.Constitution;
.prototype.usesArmor = true;
.prototype.accuracyStat = STAT_INDICES.Dexterity;
.prototype.evasionStat = STAT_INDICES.Agility;
.prototype.delay = ;
.prototype.cooldownMult = ;
.prototype.prerequisites = [];*/

function QuickStab(level, user) {
	this.level = level;
	this.power = this.powerMult * this.level;
	this.user = user;
	this.maxCooldown = this.cooldownMult * this.level;
}; TECHNIQUES.push(QuickStab);
QuickStab.prototype = Object.create(Technique);
QuickStab.prototype.name = "Quick Stab";
QuickStab.prototype.flavor = "A fast and accurate but weak attack.";
QuickStab.prototype.attack = true;
QuickStab.prototype.powerMult = 0.6;
QuickStab.prototype.attribute = ATTRIBUTE_INDICES.piercing;
QuickStab.prototype.hitrate = 0.85;
QuickStab.prototype.attackStat = STAT_INDICES.Strength;
QuickStab.prototype.usesWeapon = true;
QuickStab.prototype.defenseStat = STAT_INDICES.Constitution;
QuickStab.prototype.usesArmor = true;
QuickStab.prototype.accuracyStat = STAT_INDICES.Dexterity;
QuickStab.prototype.evasionStat = STAT_INDICES.Agility;
QuickStab.prototype.delay = 65;
QuickStab.prototype.cooldownMult = 200;
QuickStab.prototype.cooldownStat = STAT_INDICES.Agility;
QuickStab.prototype.prerequisites = [BasicAttack];

function ArmorPierce(level, user) {
	this.level = level;
	this.power = this.powerMult * this.level;
	this.user = user;
	this.maxCooldown = this.cooldownMult * this.level;
}; TECHNIQUES.push(ArmorPierce);
ArmorPierce.prototype = Object.create(Technique);
ArmorPierce.prototype.name = "Armor Pierce";
ArmorPierce.prototype.flavor = "Stabby stabby.";
ArmorPierce.prototype.attack = true;
ArmorPierce.prototype.powerMult = 0.8;
ArmorPierce.prototype.attribute = ATTRIBUTE_INDICES.piercing;
ArmorPierce.prototype.hitrate = 0.75;
ArmorPierce.prototype.attackStat = STAT_INDICES.Strength;
ArmorPierce.prototype.usesWeapon = true;
ArmorPierce.prototype.defenseStat = STAT_INDICES.Constitution;
ArmorPierce.prototype.usesArmor = 0.5;
ArmorPierce.prototype.accuracyStat = STAT_INDICES.Dexterity;
ArmorPierce.prototype.evasionStat = STAT_INDICES.Agility;
ArmorPierce.prototype.delay = 110;
ArmorPierce.prototype.cooldownMult = 500;
ArmorPierce.prototype.cooldownStat = STAT_INDICES.Intelligence;
ArmorPierce.prototype.prerequisites = [BasicAttack];
ArmorPierce.prototype.effect = function(source) {
	this.source = source;
}
ArmorPierce.prototype.effect.prototype = Object.create(BasicEffectPhysic);
ArmorPierce.prototype.effect.prototype.target = true;
ArmorPierce.prototype.effect.prototype.statChangeMults = statsToArray({
	Armor : -1.0,
}, 0);
ArmorPierce.prototype.effect.prototype.duration = 300;
ArmorPierce.prototype.effect.prototype.rate = 1.0;