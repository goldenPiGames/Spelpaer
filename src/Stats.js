const STATS_ARRAY = [
	"Vitality",
	"Strength",
	"Constitution",
	"Dexterity",
	"Agility",
	"Intelligence",
	"Wisdom",
	"Charisma",
	"Potential",
	"HReduce",
]

const STAT_INDICES = {};

STATS_ARRAY.forEach(function(nom, dex) {
	STAT_INDICES[nom] = dex;
	STAT_INDICES[nom.substring(0, 3).toUpperCase()] = dex;
});

function statMultsToArray(mults, level) {
	ray = [];
	for (var i = 0; i < STATS_ARRAY.length-1; i++) {
		var mult = mults[STATS_ARRAY[i]]
		if (dex != undefined)
			ray[i] = Math.ceil(mult * level);
		else
			throw STATS_ARRAY[i] + " could not be found.";
	}
	ray[STAT_INDICES.HRE] = level;
	return ray;
}