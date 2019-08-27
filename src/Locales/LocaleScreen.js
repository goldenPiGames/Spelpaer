function LocaleScreen(locale) {
	this.locale = locale;
	this.POImenu = new ScrollMenu(0, 0, 350, mainHeight(), activatePOI, locale.getPOIs(), "type");
	this.leaveButton = locale.isSub ? 
		new Button(settings.width-200, mainHeight()-50, 190, 40, "Return", "Exit to the previous location", ()=>currentLoc.parent.arrive()) :
		new Button(settings.width-200, mainHeight()-50, 190, 40, "Depart", "Set out for another place.", ()=>switchScreen(WorldMapScreen));
	this.menuButton = new Button(settings.width-95, 5, 90, 40, "Menu", "Open up the menu.", openGameMenu);
	
	this.objects = [this.POImenu, this.leaveButton, this.menuButton];
	//this.image = image;
}
LocaleScreen.prototype = Object.create(ScreenBase);
LocaleScreen.prototype.update = function() {
	advanceTime(1, true);
	this.objects.forEach(oj=>oj.update());
}
LocaleScreen.prototype.draw = function() {
	clearBack();
	this.objects.forEach(oj=>oj.draw());
}