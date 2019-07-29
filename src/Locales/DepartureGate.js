var DepartureGate = {
	__proto__ : Locale,
    name : "Departure Gate",
	description : "An odd gate that stands as the only point of physical travel between Pocutop and the outside world.",
	music : "Fuji",
	x : 136,
	y : 366,
	//paths : [InceptiveTrailEast, WayOfApathy],
	getPOIs : function() {
		var thisser = this;
		var pois = [];
		if (Flags.departureFinished)
			pois.push(new BasicPOI("Forcefield", "Enter the strange forcefield.",
				new DialogLine("You", null, "Now that we have our tokens embedded, we can pass through this gate."),
				function(){
					thisser.paths.forEach(function(dab) {
						dab.available = true;
					})
				},
				"All paths leading out of Departure Gate are unlocked."),);
		else
			pois.push(new BasicPOI("Forcefield", "There's a strange forcefield.",
				new DialogLine("You", null, "This is a strange forcefield. I can't even begin to figure out how to get through it."),
				new DialogLine("Companion", null, "I can just make out the outside world through there. Looks like a huge, open field."),
				new DialogLine("You", null, "Don't worry, we'll see it soon enough. For now let's just focus on completing the trial.")));
		return pois;
	}
}; LOCALES.push(DepartureGate);