class InflictBase extends Spell {
	constructor() {
		super();
	}
}
InflictBase.prototype.flavor = "A surge of negative energy.";
InflictBase.prototype.attribute = ATTRIBUTE_INDICES.negative;
InflictBase.prototype.hitrate = 0.65;
InflictBase.prototype.damageInflection = 0.7;
InflictBase.prototype.attackStat = STAT_INDICES.Wisdom;
InflictBase.prototype.attackStat2 = false;
InflictBase.prototype.defenseStat = STAT_INDICES.Vitality;
InflictBase.prototype.accuracyStat = STAT_INDICES.Charisma;
InflictBase.prototype.evasionStat = STAT_INDICES.Wisdom;
InflictBase.prototype.cooldownStat = STAT_INDICES.Wisdom;
InflictBase.prototype.delay = 150;

class InflictLight extends InflictBase {
	constructor() {
		super();
	}
}; SPELLS.push(InflictLight);
InflictLight.prototype = Object.create(InflictBase);
InflictLight.prototype.name = "Inflict Light";
InflictLight.prototype.level = 10;
InflictLight.prototype.power = 14;
InflictLight.prototype.cost = 1;
InflictLight.prototype.maxCooldown = HOURS*20;

class InflictModerate extends InflictBase {
	constructor() {
		super();
	}
}; SPELLS.push(InflictModerate);
InflictModerate.prototype = Object.create(InflictBase);
InflictModerate.prototype.name = "Inflict Moderate";
InflictModerate.prototype.level = 20;
InflictModerate.prototype.power = 28;
InflictModerate.prototype.cost = 2;
InflictModerate.prototype.maxCooldown = HOURS*40;

class InflictSerious extends InflictBase {
	constructor() {
		super();
	}
}; SPELLS.push(InflictSerious);
InflictSerious.prototype = Object.create(InflictBase);
InflictSerious.prototype.name = "Inflict Serious";
InflictSerious.prototype.level = 30;
InflictSerious.prototype.power = 42;
InflictSerious.prototype.cost = 3;
InflictSerious.prototype.maxCooldown = HOURS*60;

class InflictCritical extends InflictBase {
	constructor() {
		super();
	}
}; SPELLS.push(InflictCritical);
InflictCritical.prototype = Object.create(InflictBase);
InflictCritical.prototype.name = "Inflict Critical";
InflictCritical.prototype.level = 40;
InflictCritical.prototype.power = 56;
InflictCritical.prototype.cost = 4;
InflictCritical.prototype.maxCooldown = HOURS*80;

class InflictExtreme extends InflictBase {
	constructor() {
		super();
	}
}; SPELLS.push(InflictExtreme);
InflictExtreme.prototype = Object.create(InflictBase);
InflictExtreme.prototype.name = "Inflict Extreme";
InflictExtreme.prototype.level = 50;
InflictExtreme.prototype.power = 70;
InflictExtreme.prototype.cost = 5;
InflictExtreme.prototype.maxCooldown = HOURS*100;

/*function RepairLight(user) {
	this.user = user;
}
RepairLight.prototype = Object.create(InflictLight.prototype);
RepairLight.prototype.attribute = "repair";*/