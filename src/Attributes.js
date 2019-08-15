const ATTRIBUTE_NAMES = [
	"untyped",
	"cutting",
	"piercing",
	"bludgeoning",
	"fire",
	"ice",
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
	"program",
]

const ATTRIBUTE_INDICES = {};

ATTRIBUTE_NAMES.forEach(function(nom, dex) {
	ATTRIBUTE_INDICES[nom] = dex;
});

function attributesToArray(stuff, normal = 1.0) {
	ray = [];
	for (var i = 0; i < ATTRIBUTE_NAMES.length; i++) {
		ray[i] = normal;
	}
	for (nom in stuff) {
		var dex = ATTRIBUTE_INDICES[nom];
		if (dex != undefined)
			ray[dex] = stuff[nom];
		else
			throw nom + " is not a valid element.";
	}
	return ray;
}