const LOCATIONS_BY_NAME = {};

LOCALES.forEach(function(dab) {
	LOCATIONS_BY_NAME[dab.name] = dab;
	dab.paths = [];
});

PATHS.forEach(function(dab) {
	LOCATIONS_BY_NAME[dab.name] = dab;
	dab.connectionWest.paths.push(dab);
	dab.connectionEast.paths.push(dab);
	if (!dab.distance)
		dab.distance = Math.ceil(distanceBetween(dab.connectionWest.x, dab.connectionWest.y, dab.connectionEast.x, dab.connectionEast.y)*MINUTES);
});

SUBLOCALES.forEach(function(dab) {
	LOCATIONS_BY_NAME[dab.name] = dab;
});

function getLocationByName(name) {
	return LOCATIONS_BY_NAME[name];
}

function unlockPath(path) {
	path.available = true;
}
/*
function distanceBetween(departure, destination) {
	return dist(departure.latitude, departure.longitude, destination.latitude, destination.longitude)
}
*/