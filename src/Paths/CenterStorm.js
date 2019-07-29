var StormApproachWest = {
	__proto__ : Path,
    name : "Storm Approach West",
	description : "A rainy path leading up to the Stormstone.",
	available : false,
	encounterList : [[Wolf, Wolf], [Wolf, Wolf, Wolf], [Moose]],
	encounterLevel : 19,
	connectionWest : Bordasca,
	connectionEast : RaziShrine,
	music : "Tempest",//"Happy Clouds",
	battleMusic : "Tempest",//"Fantasy Forest Battle",
	getWeatherObject : getStandardRain,
	getBattleWeatherObject : getStandardBattleRain
}