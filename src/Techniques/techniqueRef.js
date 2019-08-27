const TECHNIQUES_BY_NAME = {};

TECHNIQUES.forEach(function(tech) {
	TECHNIQUES_BY_NAME[tech.name] = tech;
});

function refreshKnownTechniques() {
	companion.techniques = [];
	TECHNIQUES.forEach(function(tech) {
		if (tech.prototype.known)
			companion.techniques.push(new tech(tech.prototype.known, companion));
		if (typeof tech.prototype.attribute != "number")
			throw tech.name+"'s attribute is not valid.";
	});
}