const TECHNIQUES_BY_NAME = {};

TECHNIQUES.forEach(function(tech) {
	TECHNIQUES_BY_NAME[tech.name] = tech;
});

function refreshKnownTechniques() {
	companion.techniques = [];
	TECHNIQUES.forEach(function(item) {
		if (item.prototype.known)
			companion.techniques.push(new item(item.prototype.known, companion));
	});
}