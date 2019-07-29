var AroundTheBubbleEast = {
	__proto__ : Path,
    name : "Around the Bubble (East)",
	description : "Following along the edge of the great forcefield.",
	available : false,
	encounterList : [[Boar], [Moose], [Wolf, Wolf], [Wolf, Wolf, Wolf]],
	encounterLevel : 14,
	connectionWest : Bordebulle,
	connectionEast : DepartureGate,
	music : "Mountainside",
	battleMusic : "FantasyForestBattle"
}

var AroundTheBubbleNorth = {
	__proto__ : Path,
    name : "Around the Bubble (North)",
	description : "Following along the edge of the great forcefield.",
	available : true,
	encounterList : [[Boar], [Moose], [Wolf, Wolf], [Wolf, Wolf, Wolf]],
	encounterLevel : 15,
	connectionWest : Coimer,
	connectionEast : Bordebulle,
	music : "Mountainside",
	battleMusic : "FantasyForestBattle"
}

var MernBeach = {
	__proto__ : Path,
    name : "Mern Beach",
	description : "A white-sand beach. It would make for a nice, romantic stroll if not for the constant threat of aggressive creatures from the woods and the sea.",
	available : true,
	encounterList : [[Squid], [Squid, Squid], [Wolf, Wolf], [Wolf, Wolf, Wolf]],
	encounterLevel : 16,
	connectionWest : Innsport,
	connectionEast : Coimer,
	music : "Mountainside",
	battleMusic : "FantasyForestBattle"
}

var RaidersPath = {
	__proto__ : Path,
	name : "Raiders' Path",
	description : "A barely visible trail that leads through the woods, used by the Hoblins when they raided Innsport.",
	available : false,
	encounterList : [[Hoblin, Hoblin], [Hoblin, Hoblin, Hoblin], [Wolf, Wolf], [Wolf, Wolf, Wolf]],
	encounterLevel : 17,
	connectionWest : Innsport,
	connectionEast : HoblinsDen,
	music : null,
	battleMusic : "FantasyForestBattle"
}

var StarBeach = {
	__proto__ : Path,
    name : "Star Beach",
	description : "A white-sand beach. It would make for a nice, romantic stroll if not for the constant threat of aggressive creatures from the woods and the sea.",
	available : true,
	encounterList : [[Squid], [Squid, Squid], [Wolf, Wolf], [Wolf, Wolf, Wolf]],
	encounterLevel : 17,
	connectionWest : Innsport,
	connectionEast : Sterand,
	music : "Mountainside",
	battleMusic : "FantasyForestBattle"
}