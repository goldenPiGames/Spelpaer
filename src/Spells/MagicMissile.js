var MagicMissileBase = {
	attribute : ATTRIBUTE_INDICES.force,
	hitrate : 1.0,
	damageInflection : 0.5,
	attackStat : STAT_INDICES.Intelligence,
	defenseStat : STAT_INDICES.Wisdom,
	accuracyStat : STAT_INDICES.Dexterity,
	evasionStat : STAT_INDICES.Agility,
	cooldownStat : STAT_INDICES.Intelligence,
	delay : 100,
}
Object.setPrototypeOf(MagicMissileBase, Spell);

function MagicMissile1(user) {
	this.user = user;
}; SPELLS.push(MagicMissile1);
MagicMissile1.prototype = Object.create(MagicMissileBase);
MagicMissile1.prototype.name = "Magic Missile";
MagicMissile1.prototype.flavor = "A wizard's most reliable spell. An invisible projectile made of pure force unerringly strikes the target.";
MagicMissile1.prototype.level = 10;
MagicMissile1.prototype.power = 8;
MagicMissile1.prototype.maxCooldown = 900*10;
MagicMissile1.prototype.cost = 1;

function MagicMissile2(user) {
	this.user = user;
}; SPELLS.push(MagicMissile2);
MagicMissile2.prototype = Object.create(MagicMissileBase);
MagicMissile2.prototype.name = "Magic Missile x2";
MagicMissile2.prototype.flavor = "Two invisible projectile made of pure force unerringly strike the target.";
MagicMissile2.prototype.level = 20;
MagicMissile2.prototype.power = 16;
MagicMissile2.prototype.maxCooldown = 900*20;
MagicMissile2.prototype.cost = 2;

function MagicMissile3(user) {
	this.user = user;
}; SPELLS.push(MagicMissile3);
MagicMissile3.prototype = Object.create(MagicMissileBase);
MagicMissile3.prototype.name = "Magic Missile x3";
MagicMissile3.prototype.flavor = "Three invisible projectile made of pure force unerringly strike the target.";
MagicMissile3.prototype.level = 30;
MagicMissile3.prototype.power = 24;
MagicMissile3.prototype.maxCooldown = 900*30;
MagicMissile3.prototype.cost = 3;

function MagicMissile4(user) {
	this.user = user;
}; SPELLS.push(MagicMissile4);
MagicMissile4.prototype = Object.create(MagicMissileBase);
MagicMissile4.prototype.name = "Magic Missile x4";
MagicMissile4.prototype.flavor = "Four invisible projectile made of pure force unerringly strike the target.";
MagicMissile4.prototype.level = 40;
MagicMissile4.prototype.power = 32;
MagicMissile4.prototype.maxCooldown = 900*40;
MagicMissile4.prototype.cost = 4;

function MagicMissile5(user) {
	this.user = user;
}; SPELLS.push(MagicMissile5);
MagicMissile5.prototype = Object.create(MagicMissileBase);
MagicMissile5.prototype.name = "Magic Missile x5";
MagicMissile5.prototype.flavor = "Five invisible projectile made of pure force unerringly strike the target.";
MagicMissile5.prototype.level = 50;
MagicMissile5.prototype.power = 40;
MagicMissile5.prototype.maxCooldown = 900*50;
MagicMissile5.prototype.cost = 5;