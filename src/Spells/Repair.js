class RepairBase extends Spell {
	constructor() {
		super();
	}
}
RepairBase.prototype.attribute = ATTRIBUTE_INDICES.repair;
RepairBase.prototype.hitrate = 0.65;
RepairBase.prototype.damageInflection = 0.7;
RepairBase.prototype.flavor = "A surge of positive energy.";
RepairBase.prototype.attackStat = STAT_INDICES.Intelligence;
RepairBase.prototype.defenseStat = STAT_INDICES.Vitality;
RepairBase.prototype.accuracyStat = STAT_INDICES.Dexterity;
RepairBase.prototype.evasionStat = STAT_INDICES.Agility;
RepairBase.prototype.cooldownStat = STAT_INDICES.Intelligence;
RepairBase.prototype.maxCooldown = Infinity;
RepairBase.prototype.delay = 150;

class Repair1 extends RepairBase {
	constructor() {
		super();
	}
}; SPELLS.push(Repair1);
Repair1.prototype = Object.create(RepairBase);
Repair1.prototype.name = "Repair 1";
Repair1.prototype.level = 10;
Repair1.prototype.power = CureLight.prototype.power;
Repair1.prototype.cost = 1;

class Repair2 extends RepairBase {
	constructor() {
		super();
	}
}; SPELLS.push(Repair2);
Repair2.prototype = Object.create(RepairBase);
Repair2.prototype.name = "Repair 2";
Repair2.prototype.level = 20;
Repair2.prototype.power = CureModerate.prototype.power;
Repair2.prototype.cost = 2;

class Repair3 extends RepairBase {
	constructor() {
		super();
	}
}; SPELLS.push(Repair3);
Repair3.prototype = Object.create(RepairBase);
Repair3.prototype.name = "Repair 3";
Repair3.prototype.level = 30;
Repair3.prototype.power = CureSerious.prototype.power;
Repair3.prototype.cost = 3;

class Repair4 extends RepairBase {
	constructor() {
		super();
	}
}; SPELLS.push(Repair4);
Repair4.prototype = Object.create(RepairBase);
Repair4.prototype.name = "Repair 4";
Repair4.prototype.level = 40;
Repair4.prototype.power = CureCritical.prototype.power;
Repair4.prototype.cost = 4;

class Repair5 extends RepairBase {
	constructor() {
		super();
	}
}; SPELLS.push(Repair5);
Repair5.prototype = Object.create(RepairBase);
Repair5.prototype.name = "Repair 5";
Repair5.prototype.level = 50;
Repair5.prototype.power = CureExtreme.prototype.power;
Repair5.prototype.cost = 5;