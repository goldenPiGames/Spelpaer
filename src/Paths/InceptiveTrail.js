var InceptiveTrailWest = {
	__proto__ : Path,
    name : "Inceptive Trail (West)",
	description : "An trail in the woods. The first time you walk along from one Locale to another. It may not be particularly interesting, but it's a start.",
	available : false, //DEBUG false for final
	//distance : 80,
	sector: SECTOR_W,
	encounterTable : [
		{enemies: [{enemy:Boar}]},
		{enemies: [{enemy:Moose}]},
		{enemies: [{enemy:Wolf, levelMult:0.8}, {enemy:Wolf, levelMult:0.8}]},
		{enemies: [{enemy:Wolf, levelMult:0.7}, {enemy:Wolf, levelMult:0.8}, {enemy:Wolf, levelMult:0.6}]},
	],
	encounterLevelBase : 10,
	connectionWest : Pocutop,
	connectionEast : DepartureShrine,
	music : "Mountainside",
	battleMusic : "BattleField 2",
}; PATHS.push(InceptiveTrailWest);

var InceptiveTrailEast = {
	__proto__ : Path,
    name : "Inceptive Trail (East)",
	description : "The continuation of the Inceptive Trail.",
	available : true,
	//distance : 100,
	sector: SECTOR_W,
	encounterTable : InceptiveTrailWest.encounterTable,
	encounterLevelBase : 11,
	connectionWest : DepartureShrine,
	connectionEast : DepartureGate,
	music : "Mountainside",
	battleMusic : "BattleField 2",
}; PATHS.push(InceptiveTrailEast);