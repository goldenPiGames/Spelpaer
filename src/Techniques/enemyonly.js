class WildGore extends Technique {
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
}//; TECHNIQUES.push(WildGore);
WildGore.prototype = Object.create(Technique);
WildGore.prototype.name = "Wild Gore";
WildGore.prototype.flavor = "A reckless and powerful attack with tusks, horns, antlers, or the like.";
WildGore.prototype.attack = true;
WildGore.prototype.powerMult = 1.7;
WildGore.prototype.attribute = ATTRIBUTE_INDICES.piercing;
WildGore.prototype.hitrate = 0.45;
WildGore.prototype.attackStat = STAT_INDICES.Strength;
WildGore.prototype.usesWeapon = false;
WildGore.prototype.defenseStat = STAT_INDICES.Constitution;
WildGore.prototype.usesArmor = true;
WildGore.prototype.accuracyStat = STAT_INDICES.Dexterity;
WildGore.prototype.evasionStat = STAT_INDICES.Agility;
WildGore.prototype.delay = 140;
WildGore.prototype.cooldownMult = 240;
WildGore.prototype.cooldownStat = STAT_INDICES.Constitution;

class AnkleBite extends Technique {
	constructor(level) {
		super(level);
	}
}
AnkleBite.prototype = Object.create(Technique);
AnkleBite.prototype.name = "Ankle Bite";
AnkleBite.prototype.flavor = "A bite to the enemy's ankle that makes them slower.";
AnkleBite.prototype.attack = true;
AnkleBite.prototype.powerMult = 0.8;
AnkleBite.prototype.attribute = ATTRIBUTE_INDICES.piercing;
AnkleBite.prototype.hitrate = 0.75;
AnkleBite.prototype.attackStat = STAT_INDICES.Strength;
AnkleBite.prototype.usesWeapon = false;
AnkleBite.prototype.defenseStat = STAT_INDICES.Constitution;
AnkleBite.prototype.usesArmor = true;
AnkleBite.prototype.accuracyStat = STAT_INDICES.Dexterity;
AnkleBite.prototype.evasionStat = STAT_INDICES.Agility;
AnkleBite.prototype.delay = 100;
AnkleBite.prototype.cooldownMult = 300;
AnkleBite.prototype.cooldownStat = STAT_INDICES.Intelligence;

class AnkleBiteEffect extends Effect {
	constructor(source) {
		super(source);
	}
}
AnkleBiteEffect.prototype.statChangeMults = statsToArray({
	Agility : -0.5,
}, 0);
AnkleBiteEffect.prototype.maxDuration = 150;

class PackAttack extends Technique {
	constructor(level) {
		super(level);
	}
	getConditionalMult(attacker, defender) {
		return battle.getMembersOfSide(attacker.team, true).length;
	}
}//; TECHNIQUES.push(PackAttack);
PackAttack.prototype = Object.create(Technique);
PackAttack.prototype.name = "Pack Attack";
PackAttack.prototype.flavor = "Damage is multiplied by the number of allies.";
PackAttack.prototype.attack = true;
PackAttack.prototype.powerMult = 0.6;
PackAttack.prototype.attribute = WEAPON_ATTRIBUTE;
PackAttack.prototype.hitrate = 0.75;
PackAttack.prototype.attackStat = STAT_INDICES.Strength;
PackAttack.prototype.usesWeapon = true;
PackAttack.prototype.defenseStat = STAT_INDICES.Constitution;
PackAttack.prototype.usesArmor = true;
PackAttack.prototype.accuracyStat = STAT_INDICES.Dexterity;
PackAttack.prototype.evasionStat = STAT_INDICES.Agility;
PackAttack.prototype.delay = 110;
PackAttack.prototype.cooldownMult = 180;
PackAttack.prototype.cooldownStat = STAT_INDICES.Charisma;