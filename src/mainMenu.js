function doMainMenu() {
	switchScreen(MainMenu);
}

function MainMenu() {
	this.objects = [
		new Label(0, 10, settings.width, 100, "Spelpaer"),
		new Button(settings.width/2-200, mainHeight()-200, 400, 45, "Play", "Create a new file or load and existing one.", ()=>switchScreen(FileSelect)),
		new Button(settings.width/2-200, mainHeight()-150, 400, 45, "Jukebox", "Listen to all the music tracks used in the game, plus some I plan to use in the future. You can see the credits for each individual track, or visit them on other sites.", ()=>switchScreen(Jukebox)),
		new Button(settings.width/2-200, mainHeight()-100, 400, 45, "Credits", "View the persons who made this game.", ()=>switchScreen(Credits)),
		new Button(settings.width/2-200, mainHeight()-50, 400, 45, "Settings", "Change some of the game's settings.", doSettings),
	]
}
MainMenu.prototype = Object.create(ScreenBase);

function FileSelect() {
	this.objects = [
		new Button(settings.width-155, mainHeight()-50, 150, 45, "Return", "Return to the main menu.", function(){switchScreen(MainMenu)}),
	];
	for (var i = 1; i <= 6; i++) {
		if (fileExists(i)) {
			var startButton = new Button(settings.width/2-200, 75 + 50*i, 400, 45, fileTitle(i), fileDescription(i), function(){loadGame(this.slot)});
			startButton.slot = i;
			var deleteButton = new Button(settings.width/2+205, 80 + 50*i, 35, 35, "x", "Delete this file.", function() {deleteFile(this.slot); switchScreen(FileSelect)});
			deleteButton.slot = i;
			this.objects.push(startButton, deleteButton);
		} else {
			startButton = new Button(settings.width/2-200, 75+50*i, 400, 45, "New Game", "Start a new game in slot "+i+".", function(){saveSlot = this.slot; newGame()});
			startButton.slot = i;
			this.objects.push(startButton);
		}
	}
}
FileSelect.prototype = Object.create(ScreenBase);