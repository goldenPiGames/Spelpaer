const READABLE_STATS = [STAT_INDICES.Vitality, STAT_INDICES.Strength, STAT_INDICES.Constitution, STAT_INDICES.Dexterity, STAT_INDICES.Agility, STAT_INDICES.Intelligence, STAT_INDICES.Wisdom, STAT_INDICES.Charisma, STAT_INDICES.Weapon, STAT_INDICES.Armor, STAT_INDICES.Implement, STAT_INDICES.Resistance]

class ReadStats extends Spell {
	constructor() {
		super();
	}
}; SPELLS.push(ReadStats);
ReadStats.prototype = Object.create(Spell);
ReadStats.prototype.name = "Read Stats";
ReadStats.prototype.flavor = "Quickly tells you the stats of one enemy.";
ReadStats.prototype.level = 1;
ReadStats.prototype.attack = false;
ReadStats.prototype.attribute = ATTRIBUTE_INDICES.program;
ReadStats.prototype.delay = 45;
ReadStats.prototype.maxCooldown = 100;
ReadStats.prototype.cooldownStat = STAT_INDICES.Intelligence;
ReadStats.prototype.cost = 1;
ReadStats.prototype.execute = function(user, target) {
	if (user.team) {
		messageList = [];
		for (var i = 0; i < READABLE_STATS.length; i++) {
			messageList.push(new DialogLine("Read Stats", null, STAT_NAMES[READABLE_STATS[i]] + ": Normally " + target.stats[READABLE_STATS[i]] + ", currently " + target.getStat(READABLE_STATS[i]) + "."));
		}
		dialog.begin(messageList);
	} else {
		user.readStats = true;
	}
}

class ReadEffectiveness extends Spell {
	constructor() {
		super();
	}
}; SPELLS.push(ReadEffectiveness);
ReadEffectiveness.prototype = Object.create(Spell);
ReadEffectiveness.prototype.name = "Read Stats";
ReadEffectiveness.prototype.flavor = "Quickly tells you the stats of one enemy.";
ReadEffectiveness.prototype.level = 1;
ReadEffectiveness.prototype.attack = false;
ReadEffectiveness.prototype.attribute = ATTRIBUTE_INDICES.program;
ReadEffectiveness.prototype.delay = 45;
ReadEffectiveness.prototype.maxCooldown = 100;
ReadEffectiveness.prototype.cooldownStat = STAT_INDICES.Intelligence;
ReadEffectiveness.prototype.cost = 1;
ReadEffectiveness.prototype.execute = function(user, target) {
	if (user.team) {
		var statsList = [STAT_INDICES.Vitality, STAT_INDICES.Strength, STAT_INDICES.Constitution, STAT_INDICES.Dexterity, STAT_INDICES.Agility, STAT_INDICES.Intelligence, STAT_INDICES.Wisdom, STAT_INDICES.Charisma, STAT_INDICES.Weapon, STAT_INDICES.Armor];
		messageList = [];
		for (var i = 1; i < statsList.length; i++) {
			if (target.effectiveness[i] != 1.0)
				messageList.push(new DialogLine("Read Effectiveness", null, ATTRIBUTE_NAMES[i] + ": " + asPercentage(target.effectiveness[i])));
		}
		dialog.begin(messageList);
	} else {
		user.readEffectiveness = true;
	}
}
