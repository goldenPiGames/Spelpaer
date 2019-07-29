function MagicMissile(user) {
	this.user = user;
}; SPELLS.push(MagicMissile);
MagicMissile.prototype = Object.create(Spell);
MagicMissile.prototype.name = "Magic Missile";
MagicMissile.prototype.flavor = "A wizard's most reliable spell. An invisible projectile made of pure force unerringly strikes the target.";
MagicMissile.prototype.level = 10;
MagicMissile.prototype.power = 10;
MagicMissile.prototype.attribute = "force";
MagicMissile.prototype.hitrate = 1.0;
MagicMissile.prototype.damageInflection = 0.5;
MagicMissile.prototype.attackStat = "Intelligence";
MagicMissile.prototype.defenseStat = "Wisdom";
MagicMissile.prototype.accuracyStat = "Dexterity";
MagicMissile.prototype.evasionStat = "Agility";
MagicMissile.prototype.delay = 100;
MagicMissile.prototype.cost = 5;

function MagicMissile2(user) {
	this.user = user;
}; SPELLS.push(MagicMissile2);
MagicMissile2.prototype = Object.create(MagicMissile.prototype);
MagicMissile2.prototype.name = "Magic Missile x2";
MagicMissile2.prototype.flavor = "Two invisible projectile made of pure force unerringly strike the target.";
MagicMissile2.prototype.level = 20;
MagicMissile2.prototype.power = 20;
MagicMissile2.prototype.cost = 12;

function MagicMissile3(user) {
	this.user = user;
}; SPELLS.push(MagicMissile3);
MagicMissile3.prototype = Object.create(MagicMissile.prototype);
MagicMissile3.prototype.name = "Magic Missile x3";
MagicMissile3.prototype.flavor = "Three invisible projectile made of pure force unerringly strike the target.";
MagicMissile3.prototype.level = 30;
MagicMissile3.prototype.power = 30;
MagicMissile3.prototype.cost = 20;

function MagicMissile4(user) {
	this.user = user;
}; SPELLS.push(MagicMissile4);
MagicMissile4.prototype = Object.create(MagicMissile.prototype);
MagicMissile4.prototype.name = "Magic Missile x4";
MagicMissile4.prototype.flavor = "Four invisible projectile made of pure force unerringly strike the target.";
MagicMissile4.prototype.level = 40;
MagicMissile4.prototype.power = 40;
MagicMissile4.prototype.cost = 30;

function MagicMissile5(user) {
	this.user = user;
}; SPELLS.push(MagicMissile5);
MagicMissile5.prototype = Object.create(MagicMissile.prototype);
MagicMissile5.prototype.name = "Magic Missile x5";
MagicMissile5.prototype.flavor = "Five invisible projectile made of pure force unerringly strike the target.";
MagicMissile5.prototype.level = 50;
MagicMissile5.prototype.power = 50;
MagicMissile5.prototype.cost = 41;