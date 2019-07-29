var DeepGrotto = {
	__proto__ : Locale,
    name : "Deep Grotto",
	description : "A cave, hidden on the bottom of the sea.",
	//image : makeImage("src/Locales/PiemonteVillage.png"),
	music : "Still of Night",
	x : 10,
	y : 160,
	getPOIs : function() {
		var thisser = this;
		pois = [];
		
		return pois;
	},
	firstArriveEvent : function() {
		this.visited = false;
		dialog.begin(new DialogLine("Companion", null, "Oh look there are Deep Ones."), //TODO dialog
			new DialogLine("Deep One", null, "Die, landdwellers!"),
			function(){battle.begin([new DeepInvader(16), new DeepInvader(16)], "WickedDreams", function(){Innsport.arrive();})});
	},
	population : 25,
	prepareWaterBreathing : true
}