const DEFEAT_NAMES = [
	"Active",
	"Dead",
	"KO",
	"Surrendered",
	"Fled",
]

const DEFEAT_INDICES = {};

DEFEAT_NAMES.forEach(function(nom, dex) {
	DEFEAT_INDICES[nom] = dex;
});

function defArray(oj, fault) {
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

const DROP_CONDITIONS = {
	deadOnly : function(nem) {
		return nem.defeated == DEFEAT_INDICES.Dead;
	},
	unconscious : function(nem) {
		return nem.defeated == DEFEAT_INDICES.Dead || nem.defeated == DEFEAT_INDICES.KO;
	},
}