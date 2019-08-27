class CureBase extends Spell {
	constructor() {
		super();
	}
}
CureBase.prototype.attribute = ATTRIBUTE_INDICES.positive;
CureBase.prototype.hitrate = 0.65;
CureBase.prototype.damageInflection = 0.7;
CureBase.prototype.attackStat = STAT_INDICES.Wisdom;
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
CureLight.prototype.flavor = "A surge of positive energy.";
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
CureModerate.prototype.flavor = "A surge of positive energy.";
CureModerate.prototype.level = 20;
CureModerate.prototype.power = 28;
CureModerate.prototype.cost = 2;

class CureSerious extends CureBase {
	constructor() {
		super();
	}
}; SPELLS.push(CureSerious);
CureSerious.prototype = Object.create(CureBase);
CureSerious.prototype.name = "Cure Moderate";
CureSerious.prototype.flavor = "A surge of positive energy.";
CureSerious.prototype.level = 30;
CureSerious.prototype.power = 42;
CureSerious.prototype.cost = 20;

class CureCritical extends CureBase {
	constructor() {
		super();
	}
}; SPELLS.push(CureCritical);
CureCritical.prototype = Object.create(CureBase);
CureCritical.prototype.name = "Cure Moderate";
CureCritical.prototype.flavor = "A surge of positive energy.";
CureCritical.prototype.level = 40;
CureCritical.prototype.power = 56;
CureCritical.prototype.cost = 30;

class CureExtreme extends CureBase {
	constructor() {
		super();
	}
}; SPELLS.push(CureExtreme);
CureExtreme.prototype = Object.create(CureBase);
CureExtreme.prototype.name = "Cure Moderate";
CureExtreme.prototype.flavor = "A surge of positive energy.";
CureExtreme.prototype.level = 50;
CureExtreme.prototype.power = 70;
CureExtreme.prototype.cost = 41;

/*function RepairLight(user) {
	this.user = user;
}
RepairLight.prototype = Object.create(CureLight.prototype);
RepairLight.prototype.attribute = "repair";*/