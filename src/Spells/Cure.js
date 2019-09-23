class CureBase extends Spell {
	constructor() {
		super();
	}
}
CureBase.prototype.flavor = "A surge of positive energy.";
CureBase.prototype.attribute = ATTRIBUTE_INDICES.positive;
CureBase.prototype.hitrate = 0.65;
CureBase.prototype.damageInflection = 0.7;
CureBase.prototype.attackStat = STAT_INDICES.Wisdom;
CureBase.prototype.attackStat2 = false;
CureBase.prototype.defenseStat = STAT_INDICES.Vitality;
CureBase.prototype.accuracyStat = STAT_INDICES.Charisma;
CureBase.prototype.evasionStat = STAT_INDICES.Wisdom;
CureBase.prototype.cooldownStat = STAT_INDICES.Wisdom;
CureBase.prototype.maxCooldown = Infinity;
CureBase.prototype.delay = 150;

class CureLight extends CureBase {
	constructor() {
		super();
	}
}; SPELLS.push(CureLight);
CureLight.prototype = Object.create(CureBase);
CureLight.prototype.name = "Cure Light";
CureLight.prototype.level = 10;
CureLight.prototype.power = 15;
CureLight.prototype.cost = 1;

class CureModerate extends CureBase {
	constructor() {
		super();
	}
}; SPELLS.push(CureModerate);
CureModerate.prototype = Object.create(CureBase);
CureModerate.prototype.name = "Cure Moderate";
CureModerate.prototype.level = 20;
CureModerate.prototype.power = 30;
CureModerate.prototype.cost = 2;

class CureSerious extends CureBase {
	constructor() {
		super();
	}
}; SPELLS.push(CureSerious);
CureSerious.prototype = Object.create(CureBase);
CureSerious.prototype.name = "Cure Serious";
CureSerious.prototype.level = 30;
CureSerious.prototype.power = 45;
CureSerious.prototype.cost = 3;

class CureCritical extends CureBase {
	constructor() {
		super();
	}
}; SPELLS.push(CureCritical);
CureCritical.prototype = Object.create(CureBase);
CureCritical.prototype.name = "Cure Critical";
CureCritical.prototype.level = 40;
CureCritical.prototype.power = 60;
CureCritical.prototype.cost = 4;

class CureExtreme extends CureBase {
	constructor() {
		super();
	}
}; SPELLS.push(CureExtreme);
CureExtreme.prototype = Object.create(CureBase);
CureExtreme.prototype.name = "Cure Extreme";
CureExtreme.prototype.level = 50;
CureExtreme.prototype.power = 75;
CureExtreme.prototype.cost = 5;

/*function RepairLight(user) {
	this.user = user;
}
RepairLight.prototype = Object.create(CureLight.prototype);
RepairLight.prototype.attribute = "repair";*/