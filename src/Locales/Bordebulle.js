var Bordebulle = {
	__proto__ : Locale,
    name : "Bordebulle",
	description : "A village was built up against the bubble so that it would need to watch out for monster attacks from fewer directions.",
	image : makeImage("src/Locales/PiemonteVillage.png"),
	music : "Still of Night",
	x : 75,
	y : 195,
	getPOIs : function() {
		var thisser = this;
		pois = [];
		pois.push(new BasicPOI("Stay", "Enjoy the hospitality of the village.",
			new DialogLine("Elder", null, "I'm sure you dealt with a few monsters on the way up here, no? Allow us to offer you our hospitality."),
			longRest));
		pois.push(new BasicPOI("Elder", "A friendly-looking old man seems to be waiting for you to talk to him.",
			new DialogLine("Elder", null, "Yes, this village was built some hundred years ago because of the mysterious forcefield."),
			new DialogLine("Elder", null, "Nobody knows why it's there, but it's an impenetrable wall, so we don't need to worry about monsters coming from that way."),
			new DialogLine("Elder", null, "We keep all our lumber and watch on the northern and easterns boundaries of the town instead, so we're much safer than most of the other villages in the region."),
			new DialogLine("Elder", null, "But we're still wary, especially since Coimer was destroyed by monsters ten years ago..."),
			new DialogLine("You", null, "Coimer?"),
			new DialogLine("Elder", null, "It was a village to the east of here, at the corner of the barrier, the woods, and the sea."),
			AroundTheBubbleNorth));
		pois.push({__proto__ : Shop,
			name : "Bookstore",
			description : "A small shop that sells books, although the only ones you care about are spells.",
			image : null,
			Locale : thisser,
			getItems : function() {
				var items = [];
				items.push();
				items.push(Favor);
				items.push(Channel1);
				return items;
			}});
		return pois;
	},
	firstArriveEvent : function() {
	},
	population : 150
}