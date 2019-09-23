const STAT_NAMES = [
	"Vitality",
	"Strength",
	"Constitution",
	"Dexterity",
	"Agility",
	"Intelligence",
	"Wisdom",
	"Charisma",
	"Potential",
	"Weapon",
	"Armor",
	"Implement",
	"Resistance",
	"HReduce",
]

const STAT_ABBS = STAT_NAMES.map((nom) => nom.substring(0, 3).toUpperCase());

const STAT_INDICES = {};

STAT_NAMES.forEach(function(nom, dex) {
	STAT_INDICES[nom] = dex;
	STAT_INDICES[nom.substring(0, 3).toUpperCase()] = dex;
});

function statsToArray(oj, fault) {
	var ray = [];
	for (var i = 0; i < STAT_NAMES.length; i++) {
		var nom = STAT_NAMES[i];
		var stat = oj[nom];
		if (stat != undefined)
			ray[i] = stat;
		else {
			if (fault != undefined)
				ray[i] = fault;
			else if (i < STAT_NAMES.length-1)
				throw STAT_NAMES[i] + " could not be found.";
		}
	}
	return ray;
}

function statsFromMults(mults, level) {
	var stats = [];
	for (var i = 0; i < STAT_NAMES.length - 1; i++) {
		var mult = mults[i];
		stats[i] = Math.max(Math.round(mult * level), i >= 9 ? 0 : 1);
	}
	stats[STAT_INDICES.HRE] = level;
	return stats;
}

const STAT_COLORS = statsToArray({
	Vitality : "#FF0000",
	Strength : "#FF8000",
	Constitution : "#FFFF00",
	Dexterity : "#00FF00",
	Agility : "#00FFB0",
	Intelligence : "#0080FF",
	Wisdom : "#4000FF",
	Charisma : "#FF00FF",
	Potential : "#80808080",
	Weapon : "#B08040",
	Armor : "#B0B080",
	Implement : "#4080B0",
	Resistance : "#B080B0",
	HReduce : "#404040",
});