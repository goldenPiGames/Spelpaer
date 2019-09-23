function doMainMenu() {
	switchScreen(MainMenu);
}

class MainMenu extends Screen {
	constructor() {
		super();
		this.objects = [
			new Label(0, 10, settings.width, 100, "Spelpaer"),
			new Button(settings.width/2-200, mainHeight()-200, 400, 45, "Play", "Create a new file or load and existing one.", ()=>switchScreen(FileSelect)),
			new Button(settings.width/2-200, mainHeight()-150, 400, 45, "Jukebox", "Listen to all the music tracks used in the game, plus some I plan to use in the future. You can see the credits for each individual track, or visit them on other sites.", ()=>switchScreen(Jukebox)),
			new Button(settings.width/2-200, mainHeight()-100, 400, 45, "Credits", "View the persons who made this game.", ()=>switchScreen(Credits)),
			new Button(settings.width/2-200, mainHeight()-50, 400, 45, "Settings", "Change some of the game's settings.", doSettings),
		]
		if (differenceBetweenColors(settings.normal_color, settings.background_color) < 72)
			this.objects.push(new EmergencyColorResetter(0, mainHeight()-20, 200, 20));
	}
}

class FileSelect extends Screen {
	constructor() {
		super();
		this.objects = [
			new Button(settings.width-155, mainHeight()-50, 150, 45, "Return", "Return to the main menu.", function(){switchScreen(MainMenu)}),
		];
		for (var i = 1; i <= 6; i++) {
			if (fileExists(i)) {
				var startButton = new Button(settings.width/2-200, 75 + 50*i, 400, 45, fileTitle(i), fileDescription(i), function(){loadGame(this.slot)});
				startButton.slot = i;
				var deleteButton = new Button(settings.width/2+205, 80 + 50*i, 35, 35, "x", "Delete this file.", function() {dialog.begin(
					new DialogSplit("Game", null, "Are you sure you want to delete this file?",
						new DialogSplitChoice("Yes, delete it", ()=>{deleteFile(this.slot); switchScreen(FileSelect)}, new DialogLine("Game", null, "Slot "+this.slot+" deleted.")),
						new DialogSplitChoice("No, don't")
					))});
				deleteButton.slot = i;
				this.objects.push(startButton, deleteButton);
			} else {
				startButton = new Button(settings.width/2-200, 75+50*i, 400, 45, "New Game", "Start a new game in slot "+i+".", function(){saveSlot = this.slot; newGame()});
				startButton.slot = i;
				this.objects.push(startButton);
			}
		}
	}
}

class EmergencyColorResetter extends Button {
	constructor(x, y, width, height, text, hoverText, handler = doNothing) {
		super(x, y, width, height, "Emergency Reset Colors", "Click this button to reset your color palette.", ()=>{
				settings.normal_color="#FFFFFF";
				settings.background_color="#000000";
				switchScreen(new SettingsScreen(SettingsScreenColor));
			}, true);
	}
	draw() {
		ctx.globalAlpha = 1;
		
		ctx.fillStyle = "#000000";
		ctx.fillRect(this.x, this.y, this.width, this.height);
		
		ctx.fillStyle = "#FFFFFF";
		drawTextInRect(this.text, this.x, this.y, this.width, this.height);;
	}
}
