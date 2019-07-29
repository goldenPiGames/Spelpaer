var WayOfApathy = {
	__proto__ : Path,
    name : "Way of Apathy",
	description : "The most direct way to the town of Lethodge from Departure Gate.",
	available : false,
	encounterList : [[Wolf, Wolf], [Wolf, Wolf, Wolf]],
	encounterLevel : 13,
	connectionWest : DepartureGate,
	connectionEast : Lethodge,
	music : "Mountainside",
	battleMusic : "Fantasy Forest Battle"
}

var GreyHorizonWay = {
	__proto__ : Path,
    name : "Grey Horizon Way",
	description : "Walking towards Bordasca and the Stormstone, you can see the distant grey clouds on the horizon.",
	available : true,
	encounterList : [[Wolf, Wolf], [Wolf, Wolf, Wolf]],
	encounterLevel : 17,
	connectionWest : Lethodge,
	connectionEast : Bordasca,
	music : "Mountainside",
	battleMusic : "Fantasy Forest Battle"
}