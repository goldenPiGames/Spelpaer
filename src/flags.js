var Flags = {
	seenWorldMap: false,
	
	beginningTalkToClaire: false, //Talk to Claire and hear the prophecy.
	beginningFightManzMarcel: false, //Fight Manz and Marcel.
	
	departureNW: false, //Beast battle
	departureSW: false, //Quiz
	departureNE: false, //Pipe puzzle
	departureSE: false, //Priest battle
	departureMain: false, //Double battle
	departureFinished: false, //Tokens embedded
}
function setFlag(name) {
	if (Flags[name] == undefined)
		throw ("Oh fuckles, "+name+" is undefined!");
	Flags[name] = currentTime;
}
function getFlag(name) {
	if (Flags[name] == undefined)
		throw ("Oh fuckles, "+name+" is undefined!");
	return Flags[name];
}

function numberOfAnchorsPurified() {
	return 0;
}