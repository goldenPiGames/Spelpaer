const WEAPON_ATTRIBUTE = -1;

const ATTRIBUTE_NAMES = [
	"untyped",
	"cutting",
	"piercing",
	"bludgeoning",
	"fire",
	"cold",
	"electricity",
	"acid",
	"sonic",
	"force",
	"bio",
	"pressure",
	"radiant",
	"curse",
	"beam",
	"positive",
	"negative",
	"thought",
	"fear",
	"pain",
	"suggestion",
	"illusion",
	"repair",
	"program",
]

const ATTRIBUTE_INDICES = {};

ATTRIBUTE_NAMES.forEach(function(nom, dex) {
	ATTRIBUTE_INDICES[nom] = dex;
});

function attributesToArray(stuff, normal = 1.0) {
	var ray;
	if (Array.isArray(normal))
		ray = normal.slice();
	else {
		ray = [];
		for (var i = 0; i < ATTRIBUTE_NAMES.length; i++) {
			ray[i] = normal;
		}
	}
	for (nom in stuff) {
		var dex = ATTRIBUTE_INDICES[nom];
		if (dex != undefined)
			ray[dex] = stuff[nom];
		else
			throw nom + " is not a valid attribute.";
	}
	return ray;
}

STANDARD_EFFECTIVENESS_ANIMAL = attributesToArray({
	positive : -1.0,
	thought : 0.4,
}, 1.0);

STANDARD_EFFECTIVENESS_CONSTRUCT = attributesToArray({
	bio : 0,
	positive : 0,
	negative : 0,
	fear : 0,
	pain : 0,
	repair : -1.0,
}, 1.0);