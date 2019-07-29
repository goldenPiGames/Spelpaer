var Lethodge = {
	__proto__ : Locale,
    name : "Lethodge",
	description : "A tired village in the middle of the great western field. While it can provide rest to travelers, it also has an atmosphere of almost stifling apathy.",
	image : makeImage("src/Locales/PiemonteVillage.png"),
	music : "Still of Night",
	x : 145,
	y : 235,
	getPOIs : function() {
		var thisser = this;
		pois = [];
		pois.push(new BasicInn("Rest Shack", 100));
		pois.push(new BasicPOI("Camp", "Pitch a tent in the public grounds somewhere.",
			new DialogLine("You", null, "I don't think the residents here will have a problem if we pitch a tent here."),
			new DialogLine("Companion", null, "More like they just don't care..."),
			longRestPoor));
		pois.push({__proto__ : Shop,
			name : "Bookstore",
			description : "A small shop that sells books, although the only ones you care about are spells.",
			image : null,
			Locale : thisser,
			getItems : function() {
				var items = [];
				items.push(AcidSplash);
				items.push(Distract);
				items.push(MindThrust1);
				return items;
			}});
		return pois;
	},
	firstArriveEvent : function() {
		/*
		dialog.begin(new DialogLine("Companion", null, "Finally, another village! I wonder what it's like here?"),
			new DialogLine("You", null, "More importantly, where's an inn or similar? I'm running low on spells."),
			new DialogLine("Companion", null, "Let's ask this gentleman sitting on the rocking chair."),
			new DialogLine("Companion", null, "Excuse me, good sir! Would you happen to know the way to an inn?"),
			new DialogLine("Resident", null, "..."),
			new DialogLine("Companion", null, "Excuse me? Gentleman on the rocking chair?"),
			new DialogLine("Resident", null, "Leave me alone. Find it yourself."),
			new DialogLine("You", null, "Okay, then..."));
		*/
	},
	population: 300,
}