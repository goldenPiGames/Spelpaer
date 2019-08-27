var settings = {
	width : 800,
	height : 600,
	infoHeight : 150,
	music : .8,
	sfx : .8,
	profanity : false,
	font : "sans-serif",
	sfxSystem : "audio",
	dialogPortraits : false,
	background_color : "#000000",
	normal_color : "#FFFFFF",
	hover_color : "#00DDFF",
	click_color : "#00FF00",
	player_color : "#3434FF",
	companion_color : "#FFFF00",
	disabled_color :  "#808080",
}

function setCanvasSize(width = settings.width, height = settings.height) {
	//settings.width = width;
	canvas.width = width;
	canvas.style.width = width+"px";
	backDiv.style.width = width+"px";
	//settings.height = height;
	canvas.height = height;
	canvas.style.height = height+"px";
	backDiv.style.height = height+"px";
    ctx.textBaseline = "top";
}

function mainHeight() {
	return settings.height - settings.infoHeight;
}

function loadSettings() {
	var loaded = localStorage.getItem("SpelpaerSettings");
	if (loaded) {
		loaded = JSON.parse(loaded);
		for (sett in settings) {
			var ex = loaded[sett];
			if (ex != undefined)
				settings[sett] = ex;
		}
	}
	setCanvasSize();
	setMusicVolume(settings.music);
}

function saveSettings() {
	localStorage.setItem("SpelpaerSettings", JSON.stringify(settings));
}

function profane() {
	return settings.profanity;
}

function doSettings() {
	runnee = new SettingsScreen();
}


const HEADBAR_HEIGHT = 50;

// ----------------------------------------------------- Headbar ---------------------------------------------
function SettingsScreen(initialSub = SettingsScreenGeneral) {
	var thisser = this;
	this.tabs = [];
	SETTINGS_TAB_LIST.forEach(function(oj, dex, liss) {
		thisser.tabs.push(new BarTab(dex*100+5, 5, 90, HEADBAR_HEIGHT-10, oj.title, oj.desc, oj.cons, thisser));
	});
	this.subscreen = new initialSub();
	this.exitButton = new Button(settings.width-150, 5, 140, HEADBAR_HEIGHT - 10, "Exit", "Save your settings and return to the main menu.", function() {
		saveSettings();
		doMainMenu();
	});
}
SettingsScreen.prototype = Object.create(UIObjectBase);
SettingsScreen.prototype.update = function() {
	this.tabs.forEach(function(oj) {
		oj.update();
	});
	this.subscreen.update();
	this.exitButton.update();
}
SettingsScreen.prototype.draw = function() {
	clearBack();
	this.tabs.forEach(function(oj) {
		oj.draw();
	});
	this.subscreen.draw();
	this.exitButton.draw();
}
SettingsScreen.prototype.setSubscreen = function(subconstruct) {
	this.subscreen = new subconstruct();
}

function BarTab(x, y, width, height, text, hoverText, subconstruct, parent) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.text = text;
	this.hoverText = hoverText;
	this.subconstruct = subconstruct;
	this.parent = parent;
}

BarTab.prototype = Object.create(UIObjectBase); 
BarTab.prototype.update = function() {
	this.updateMouse();
	if (this.hovered)
		infoField.setText(this.hoverText);
	if (this.clicked)
		this.parent.setSubscreen(this.subconstruct);
}
BarTab.prototype.draw = function() {
	var color = this.parent.subscreen instanceof this.subconstruct ? settings.click_color : (this.hovered ? settings.hover_color : settings.normal_color);
	ctx.lineWidth = BUTTON_BORDER_WIDTH;
	ctx.strokeStyle = color;
	
	ctx.fillStyle = settings.background_color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
	
	var bbw = BUTTON_BORDER_WIDTH;
	ctx.strokeRect(this.x + bbw/2, this.y + bbw/2, this.width - bbw, this.height - bbw);
	
    var fontSize = 20;
	ctx.fillStyle = color;
    ctx.font = fontSize + "px "+settings.font;
	ctx.textAlign = "center";
	
    ctx.fillText(this.text, this.x + this.width/2, this.y + this.height/2 - fontSize/2);
}

// ----------------------------------------------------------------- General --------------------------------------------------

function SettingsScreenGeneral() {
	var thisser = this;
	this.musicSlider = new Slider(10, HEADBAR_HEIGHT+10, 200, 30, "Music", "Change the volume of the music.", 0, 1, function(val){settings.music = val; setMusicVolume(val)}, function(){return settings.music});
	this.sfxSlider = new Slider(10, HEADBAR_HEIGHT+50, 200, 30, "SFX", "Change the volume of sound effects.", 0, 1, function(val){settings.sfx = val}, function(){return settings.sfx});
	this.profanityCheckbox = new Checkbox(settings.width/2, HEADBAR_HEIGHT+10, 200, 30, "Profanity", "Whether dialog will include some bad words and innuendo.", function(val){settings.profanity = val}, settings.profanity);
	this.portraitsCheckbox = new Checkbox(settings.width/2, HEADBAR_HEIGHT+50, 200, 30, "Dialog Portraits", "Do you want to see the embarassingly bad dialog portraits I drew in MS Paint? Your funeral.", function(val){settings.dialogPortraits = val}, settings.dialogPortraits);
	this.objects = [
		this.musicSlider,
		this.sfxSlider,
		this.profanityCheckbox,
		//this.portraitsCheckbox,
	]
}

SettingsScreenGeneral.prototype.update = function() {
	this.objects.forEach(function(oj) {
		oj.update();
	});
}
SettingsScreenGeneral.prototype.draw = function() {
	this.objects.forEach(function(oj) {
		oj.draw();
	});
}

// ----------------------------------------------------------------- Color ----------------------------------------------------

function SettingsScreenColor() {
	var thisser = this;
	this.normalPicker = new ColorPicker(10, HEADBAR_HEIGHT+10, "Normal", "This color is used for the foreground of almost all UI objects.", val=>settings.normal_color=val, settings.normal_color);
	this.backgroundPicker = new ColorPicker(310, HEADBAR_HEIGHT+10, "Background", "This color is used for like backgrounds and stuff I guess.", val=>settings.background_color=val, settings.background_color);
	this.hoverPicker = new ColorPicker(10, HEADBAR_HEIGHT+210, "Hover", "This color indicates that something is being hovered over by the mouse.", val=>settings.hover_color=val, settings.hover_color);
	this.clickPicker = new ColorPicker(310, HEADBAR_HEIGHT+210, "Click", "This color shows that the mouse has been clicked, or that something is selected.", val=>settings.click_color=val, settings.click_color);
	this.pickers = [
		this.normalPicker,
		this.backgroundPicker,
		this.hoverPicker,
		this.clickPicker,
	];
}
SettingsScreenColor.prototype.update = function() {
	this.pickers.forEach(oj => oj.update());
}
SettingsScreenColor.prototype.draw = function() {
	ctx.fillStyle = settings.normal_color;
	let head = this.backgroundPicker.header;
	ctx.fillRect(head.x, head.y, head.width, head.height+10);
	this.pickers.forEach(oj => oj.draw());
}

// ----------------------------------------------------- Font ---------------------------------------------
const FONT_LIST = [
	{name : "monospace", description : "The default monospace font of your browser."},
	{name : "sans-serif", description : "The default sans-serif fault of your browser."},
	{name : "serif", description : "The default serif font of your browser."},
	//{name : "Arial", description : "heh"},
	{name : "Courier", description : "A common monospace font."},
	{name : "Determination Mono", description : "(Uses .otf file in game's source folder) <br> A font that fills you with something, I dunno. Source by Haley Wakamatsu: https://www.behance.net/gallery/31268855/Determination-Better-Undertale-Font)"},
	{name : "Futura Medium", description : "(Uses .otf file in game's source folder)"},
	{name : "Helvetica", description : "A common sans-serif font."},
	{name : "OpenDyslexic", description : "(Uses .otf file in game's source folder) <br> An open font intended to be easily read by people with dyslexia."},
	{name : "Times New Roman", description : "A common serif font."},
	{name : "VL Gothic Regular", description : "(Uses .ttf file in game's source folder) <br> I've probably spent thousands of hours working on this game. Use this font to make it look like I've spent less than ten."},
]

function SettingsScreenFont() {
	var thisser = this;
	this.changers = [];
	FONT_LIST.forEach(function(oj, dex) {
		thisser.changers.push(new FontChanger(20, HEADBAR_HEIGHT+10+30*dex, 300, 28, oj.name, oj.description));
	});
}
SettingsScreenFont.prototype.update = function() {
	this.changers.forEach(oj => oj.update());
}
SettingsScreenFont.prototype.draw = function() {
	this.changers.forEach(oj => oj.draw());
}

function FontChanger(x, y, width, height, font, description) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.font = font;
	this.description = description;
}
FontChanger.prototype = Object.create(UIObjectBase);
FontChanger.prototype.update = function() {
	this.updateMouse();
	if (this.hovered)
		infoField.setText(this.description);
	if (this.clicked)
		settings.font = this.font;
}
FontChanger.prototype.draw = function() {
	ctx.font = this.height+"px " + this.font;
	ctx.textAlign = "start";
	ctx.fillStyle = settings.font == this.font ? settings.click_color : (this.hovered ? settings.hover_color : settings.normal_color);
	ctx.fillText(this.font, this.x, this.y);
}
// ----------------------------------------------------- Size ---------------------------------------------

function SettingsScreenSize() {
	this.smallButton = new Button(10, HEADBAR_HEIGHT+10, 200, 40, "Small (800x600)", "s m o l", function() {
			settings.width = 800;
			settings.height = 600;
			settings.infoHeight = 150;
			setCanvasSize();
			switchScreen(new SettingsScreen(SettingsScreenSize));
		});
	this.mediumButton = new Button(10, HEADBAR_HEIGHT+60, 200, 40, "Medium (1000x750)", "normal I guess", function() {
			settings.width = 1000;
			settings.height = 750;
			settings.infoHeight = 187;
			setCanvasSize();
			switchScreen(new SettingsScreen(SettingsScreenSize));
		});
	this.largeButton = new Button(10, HEADBAR_HEIGHT+110, 200, 40, "Large (1200x900)", "b i g g", function() {
			settings.width = 1200;
			settings.height = 900;
			settings.infoHeight = 225;
			setCanvasSize();
			switchScreen(new SettingsScreen(SettingsScreenSize));
		});
	this.presets = [
		this.smallButton,
		this.mediumButton,
		this.largeButton,
	]
}
SettingsScreenSize.prototype.update = function() {
	this.presets.forEach(oj => oj.update());
}
SettingsScreenSize.prototype.draw = function() {
	this.presets.forEach(oj => oj.draw());
}


const SETTINGS_TAB_LIST = [
	{title:"General", desc:"Change music and SFX volume, profanity, and a few other things.", cons:SettingsScreenGeneral},
	{title:"Color", desc:"Adjust the color palette of the interface.", cons:SettingsScreenColor},
	{title:"Font", desc:"Choose which font is used to display the interface.", cons:SettingsScreenFont},
	{title:"Size", desc:"Change the size of the canvas that this game runs on so that it can fit better on your screen.", cons:SettingsScreenSize},
]