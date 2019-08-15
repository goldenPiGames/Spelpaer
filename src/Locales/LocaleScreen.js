function LocaleScreen(pois, isSub, image) {
	this.POImenu = new ScrollMenu(0, 0, 350, mainHeight(), activatePOI, pois, "type");
	this.leaveButton = isSub ? 
		new Button(settings.width-200, mainHeight()-50, 190, 40, "Return", "Exit to the previous location", function(){currentLoc.parent.arrive()}) :
		new Button(settings.width-200, mainHeight()-50, 190, 40, "Depart", "Set out for another place.", function(){new WorldMap().beginFromCurrentLocale();})
	this.image = image;
}
LocaleScreen.prototype = Object.create(ScreenBase);
LocaleScreen.prototype.update = function() {
	advanceTime(1);
	this.POImenu.update();
	this.leaveButton.update();
}
LocaleScreen.prototype.draw = function() {
	clearBack();
	this.POImenu.draw();
	this.leaveButton.draw();
}