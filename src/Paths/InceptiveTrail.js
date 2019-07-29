var InceptiveTrailWest = {
	__proto__ : Path,
    name : "Inceptive Trail (West)",
	description : "An trail in the woods. The first time you walk along from one Locale to another. It may not be particularly interesting, but it's a start.",
	available : false, //DEBUG false for final
	//distance : 80,
	encounterList : [[Boar], [Moose], [Wolf, Wolf], [Wolf, Wolf, Wolf]],
	encounterLevel : 10,
	connectionWest : Pocutop,
	connectionEast : DepartureShrine,
	music : "Mountainside",
	battleMusic : "BattleField 2"
}; PATHS.push(InceptiveTrailWest);

var InceptiveTrailEast = {
	__proto__ : Path,
    name : "Inceptive Trail (East)",
	description : "The continuation of the Inceptive Trail.",
	available : true,
	//distance : 100,
	encounterList : [[Boar], [Moose], [Wolf, Wolf], [Wolf, Wolf, Wolf]],
	encounterLevel : 11,
	connectionWest : DepartureShrine,
	connectionEast : DepartureGate,
	music : "Mountainside",
	battleMusic : "BattleField 2"
}; PATHS.push(InceptiveTrailEast);