const FLAG_DATA = {
	"restBegun" : {calendar:false, repeatable:true},
	"restEnded" : {calendar:false, repeatable:true},
	"seenWorldMap" : {calendar:false},
	"beginningTalkToClaire" : {name:"Talk to Claire", description:"Spoke with Voh Claire and heard about your destiny."},
	"beginningFightManzMarcel" : {name:"Fight Manz & Marcel", description:"Fought Manz and Marcel to get the experience of real combat."},
	"departureNW" : {name:"Departure NW", description:"Cleared the northwest room of the Departure Trial by defeating the red statue."},
	"departureN" : {name:"Departure N", description:"Cleared the north room of the Departure Trial by defeating the skeletons."},
	"departureNE" : {name:"Departure NE", description:"Cleared the northeast room of the Departure Trial by solving the pipe puzzle."},
	"departureSW" : {name:"Departure SW", description:"Cleared the southwest room of the Departure Trial by answering riddles."},
	"departureS" : {name:"Departure S", description:"Cleared the south room of the Departure Trial by ."},//TODO
	"departureStatueSpoken" : {name:"Departure Green Statue Spoken", description:"Spoke to the green statue and heard its advice."},
	"departureSE" : {name:"Departure SE", description:"Cleared the southeast room of the Departure Trial by defeating the green statue."},
	"departureMain" : {name:"Departure Finished", description:"Completed the Departure Trial and gained access to the outside world... or should have, at least."},
}
var flags = {
	
}

function setFlag(name) {
	if (!FLAG_DATA[name])
		throw ("Oh no, "+name+" is not a flag");
	flags[name] = currentTime;
}

function getFlag(name) {
	if (!FLAG_DATA[name])
		throw ("Oh no, "+name+" is not a flag");
	return flags[name];
}

function numberOfAnqorsPurified() {
	return 0;
}