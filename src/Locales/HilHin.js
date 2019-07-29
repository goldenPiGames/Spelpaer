var HilHin = {
	__proto__ : Locale,
    name : "Hil Hin",
	description : "A mostly ordinary town that grows rice on terraces between a hill and a decline. It feels just ever so slightly unsettling...",
	//image : makeImage(),
	music : "Aftermath",
	x : 505,
	y : 203,
	getPOIs : function() {
		var thisser = this;
		pois = [];
		if (!Flags.HilHinMayorSpoken) {
			pois.push(new BasicPOI("Inn", "This seems like a good place to get lodging.",
				new DialogLine("Innkeeper", null, "You're not from around here, yeah? The Mayor told me to send any travelers to him first. Seemed awfully serious.")));
			pois.push(new BasicPOI("Mayor", "The mayor is in a rocking chair on his porch, looking out over the town in a troubled fashion.",
				new DialogLine("Mayor", null, "There's something happening to Hil Hin. I get the feeling that a few people have started acting... strangely."),
				new DialogLine("Mayor", null, "They're very jovial and polite, even in situations where they shouldn't be. But if I question them about it, they seem slightly offended and deny that anything strange has happened."),
				new DialogLine("Mayor", null, "It all started around the currentTime that a traveler who called herself Sqotine came by. She stayed in an inn for two nights and then left the way she came."),
				new DialogLine("Mayor", null, "But as a mayor, I can't express my worries too openly. Could I trust you to look into the situation here and get back to me tomorrow? In return, I'll let you stay at the inn for free."),
				function(){Flags.HilHinMayorSpoken = day;}));
		} else if (day <= Flags.HilHinMayorSpoken) {
			pois.push(new BasicPOI("Inn", "This seems like a good place to get lodging.",
				new DialogLine("Innkeeper", null, "Please, make yourselves at home. But not too much..."),
				longRest));
			pois.push(new BasicPOI("Mayor", "The mayor is in a rocking chair on his porch, looking out over the town in a troubled fashion.",
				new DialogLine("Mayor", null, "Get back to me tomorrow.")));
		} else {
			pois.push(new BasicPOI("Inn", "This seems like a good place to get lodging.",
				new DialogLine("Innkeeper", null, "Yes, please, by all means! Stay here as long as you like, it's my pleasure."),
				longRest));
			pois.push(new BasicPOI("Mayor", "The mayor is in a rocking chair on his porch, looking out over the town with a more content expression than before.",
				new DialogLine("Player", null, "We've done a bit of investigation, but we're-"),
				new DialogLine("Mayor", null, "Don't worry about it."),
				new DialogLine("Player", null, "Huh?"),
				new DialogLine("Mayor", null, "I said don't worry about it! I've figured it out, and it's nothing to be afraid of."),
				new DialogLine("Mayor", null, "So what if people are a little bit jollier than usual? Everybody's mood qan change like the swinging seasons."),
				new DialogLine("Player", null, "Are... Are you alright?"),
				new DialogLine("Mayor", null, "I said don't worry about it! I've figured it out, it's nothing to be afraid of. Now, you're travelers, right? Don't let me qeep your on your way. Unless you want to settle down here, of qourse! Ohohohoh.")));
		}
		pois.push({__proto__ : Shop,
			name : "Bookstore",
			description : "A small shop that sells books, although the only ones you care about are spells.",
			image : null,
			Locale : thisser,
			getItems : function() {
				var items = [];
				items.push(Distract);
				items.push(MindThrust1);
				items.push(MindThrust2);
				items.push(MindThrust3);
				return items;
			}});
		pois.push(new BasicPOI("Villager", null, "A villager dawdling near the gate.",
			"There's something strange going on here, but I have no idea what. I feel scared."));
		return pois;
	},
}