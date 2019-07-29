var Walld = {
	__proto__ : Locale,
    name : "Walld",
	description : "The largest town in the northwestern forest.",
	//image : makeImage("src/Locales/PiemonteVillage.png"),
	music : "Still of Night",
	x : 170,
	y : 100,
	getPOIs : function() {
		var thisser = this;
		pois = [];
		pois.push(new BasicInn("Anasm's", 100));
		pois.push({__proto__ : Shop,
			name : "Spell Store",
			description : "Probably the only place in the Northwest Forest  where you'll find a relevant shop devoted to selling magic.",
			image : null,
			Locale : thisser,
			getItems : function() {
				var items = [];
				items.push(AcidArrow);
				items.push(MagicMissile2);
				items.push(ScorchingRay);
				items.push(Channel1);
				items.push(Channel2);
				items.push(InflictModerate);
				items.push(MindThrust1);
				items.push(MindThrust2);
				items.push(ReadEffectiveness);
				return items;
			}});
		return pois;
	},
	firstArriveEvent : function() {
		
	},
	population : 150,
	prepareWaterBreathing : true
}