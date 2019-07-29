var OceanDescent = {
	__proto__ : Path,
    name : "Ocean Descent",
	description : "The way that descends into the depths of the ocean.",
	available : false,
	encounterList : [[Squid], [Squid, Squid], [Shark]],
	encounterLevel : 19,
	connectionWest : DeepTown,
	connectionEast : Innsport,
	music : "Underwater World",
	battleMusic : "Underwater World",
	prepareWaterBreathing : true,
	underwater : true,
}

var DeepFlee = {
	__proto__ : Path,
    name : "Deep Flee",
	description : "Following along the edge of the great forcefield.",
	available : false,
	encounterList : [[Squid], [Squid, Squid], [Shark]],
	encounterLevel : 19,
	connectionWest : DeepGrotto,
	connectionEast : DeepTown,
	music : "Underwater World",
	battleMusic : "Underwater World",
	prepareWaterBreathing : true,
	underwater : true,
}