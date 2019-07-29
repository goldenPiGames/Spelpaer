LOCALES.forEach(function(dab) {
	dab.paths = [];
});

PATHS.forEach(function(dab) {
	dab.connectionWest.paths.push(dab);
	dab.connectionEast.paths.push(dab);
	if (!dab.distance)
		dab.distance = Math.ceil(dist(dab.connectionWest.x, dab.connectionWest.y, dab.connectionEast.x, dab.connectionEast.y)*MINUTES);
});

function getLocaleByName(name) {
	for (var i = 0; i < LOCALES.length; i++) {
		if (name == LOCALES[i].name)
			return LOCALES[i];
	}
	for (var i = 0; i < SUBLOCALES.length; i++) {
		if (name == SUBLOCALES[i].name)
			return SUBLOCALES[i];
	}
}

function unlockPath(path) {
	path.available = true;
}
/*
function distanceBetween(departure, destination) {
	return dist(departure.latitude, departure.longitude, destination.latitude, destination.longitude)
}
*/