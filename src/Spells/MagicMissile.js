class MagicMissileBase extends Spell {
	constructor() {
		super();
	}
}
MagicMissileBase.prototype.attribute = ATTRIBUTE_INDICES.force;
MagicMissileBase.prototype.hitrate = 1.0;
MagicMissileBase.prototype.damageInflection = 0.5;
MagicMissileBase.prototype.attackStat = STAT_INDICES.Intelligence;
MagicMissileBase.prototype.defenseStat = STAT_INDICES.Wisdom;
MagicMissileBase.prototype.accuracyStat = STAT_INDICES.Dexterity;
MagicMissileBase.prototype.evasionStat = STAT_INDICES.Agility;
MagicMissileBase.prototype.cooldownStat = STAT_INDICES.Intelligence;
MagicMissileBase.prototype.delay = 100;

class MagicMissile1 extends MagicMissileBase {
	constructor() {
		super();
	}
}; SPELLS.push(MagicMissile1);
MagicMissile1.prototype = Object.create(MagicMissileBase);
MagicMissile1.prototype.name = "Magic Missile";
MagicMissile1.prototype.flavor = "A wizard's most reliable spell. An invisible projectile made of pure force unerringly strikes the target.";
MagicMissile1.prototype.level = 10;
MagicMissile1.prototype.power = 8;
MagicMissile1.prototype.maxCooldown = 900*10;
MagicMissile1.prototype.cost = 1;

class MagicMissile2 extends MagicMissileBase {
	constructor() {
		super();
	}
}; SPELLS.push(MagicMissile2);
MagicMissile2.prototype = Object.create(MagicMissileBase);
MagicMissile2.prototype.name = "Magic Missile x2";
MagicMissile2.prototype.flavor = "Two invisible projectile made of pure force unerringly strike the target.";
MagicMissile2.prototype.level = 20;
MagicMissile2.prototype.power = 16;
MagicMissile2.prototype.maxCooldown = 900*20;
MagicMissile2.prototype.cost = 2;

class MagicMissile3 extends MagicMissileBase {
	constructor() {
		super();
	}
}; SPELLS.push(MagicMissile3);
MagicMissile3.prototype = Object.create(MagicMissileBase);
MagicMissile3.prototype.name = "Magic Missile x3";
MagicMissile3.prototype.flavor = "Three invisible projectile made of pure force unerringly strike the target.";
MagicMissile3.prototype.level = 30;
MagicMissile3.prototype.power = 24;
MagicMissile3.prototype.maxCooldown = 900*30;
MagicMissile3.prototype.cost = 3;

class MagicMissile4 extends MagicMissileBase {
	constructor() {
		super();
	}
}; SPELLS.push(MagicMissile4);
MagicMissile4.prototype = Object.create(MagicMissileBase);
MagicMissile4.prototype.name = "Magic Missile x4";
MagicMissile4.prototype.flavor = "Four invisible projectile made of pure force unerringly strike the target.";
MagicMissile4.prototype.level = 40;
MagicMissile4.prototype.power = 32;
MagicMissile4.prototype.maxCooldown = 900*40;
MagicMissile4.prototype.cost = 4;

class MagicMissile5 extends MagicMissileBase {
	constructor() {
		super();
	}
}; SPELLS.push(MagicMissile5);
MagicMissile5.prototype = Object.create(MagicMissileBase);
MagicMissile5.prototype.name = "Magic Missile x5";
MagicMissile5.prototype.flavor = "Five invisible projectile made of pure force unerringly strike the target.";
MagicMissile5.prototype.level = 50;
MagicMissile5.prototype.power = 40;
MagicMissile5.prototype.maxCooldown = 900*50;
MagicMissile5.prototype.cost = 5;