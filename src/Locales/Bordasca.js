var Bordasca = {
	__proto__ : Locale,
    name : "Bordasca",
	description : "A village that is positioned far enough away from the Stormstone so that it gets plenty of rainfall for its agriculture, but doesn't get damaged by the storms.",
	//image : makeImage("src/Locales/PiemonteVillage.png"),
	music : "Still of Night",
	x : 213,
	y : 233,
	getPOIs : function() {
		var thisser = this;
		pois = [];
		pois.push(new BasicPOI("Stay", "Enjoy the hospitality of the village.",
			new DialogLine("Lluvia", null, "By all means, stay here."),
			longRest));
		pois.push(new BasicPOI("Lluvia", "A wizard in a blue and white dress is looking up at the plateau, frowning.",
			new DialogLine("Lluvia", null, "The weather seems to have gotten even stronger up on the plateau. I doubt that any of the settlements are left after that last few stormbursts... Not that there were many up there to begin with."),
			new DialogLine("You", null, "What happened?"),
			new DialogLine("Lluvia", null, "This plateau, which we call Stormstone, is almost constantly covered in storms of varying intensity. But recently, there have been a number of intense lightningbursts."),
			StormApproachWest));
		pois.push({__proto__ : Shop,
			name : "Bookstore",
			description : "A small shop that sells books, although the only ones you care about are spells.",
			image : null,
			Locale : thisser,
			getItems : function() {
				var items = [];
				items.push(ShockingGrasp);
				items.push(AcidArrow);
				return items;
			}});
		return pois;
	},
	firstArriveEvent : function() {
	},
	population : 130,
	getWeatherObject : getDefaultRain,
	LluviaNormal: makeImage("src/CharacterImages/LluviaNormal.png")
}