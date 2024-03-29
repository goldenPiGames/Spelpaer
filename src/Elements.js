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
	"fear",
	"pain",
	"suggestion",
	"illusion",
	"hacking",
]

const ELEMENT_INDICES = {};

ATTRIBUTE_NAMES.forEach(function(nom, dex) {
	ELEMENT_INDICES[nom] = dex;
});

function attributesToArray(stuff, normal = 1.0) {
	ray = [];
	for (var i = 0; i < ATTRIBUTE_NAMES.length; i++) {
		ray[i] = normal;
	}
	for (nom in stuff) {
		var dex = ELEMENT_INDICES[nom];
		if (dex != undefined)
			ray[dex] = stuff[nom];
		else
			throw nom + " is not a valid element.";
	}
	return ray;
}