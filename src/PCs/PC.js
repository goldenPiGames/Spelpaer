const PC_DISPLAYMODE_BASIC = 0;
const PC_DISPLAYMODE_DETAIL = 1;
const PC_DISPLAYMODE_EQUIP = 2;

class PC extends Unit {
	constructor(level) {
		super(level);
	}
	recalculateStats() {
		this.stats = this.baseStats.slice();
		var resistances = this.baseEffectiveness.slice();
		resistances.fill(0);
		this.equipped.forEach(quip => {
			quip.statMods.forEach((mod, dex) => this.stats[dex] += mod);
			quip.attributeResists.forEach((res, dex) => resistances[dex] += res);
		});
		this.effectiveness = resistances.map((res, dex) => this.baseEffectiveness[dex] * (1 - res / (res + this.level)));
		var lastmax = this.maxhp;
		this.maxhp = this.hpMult * this.stats[STAT_INDICES.Vitality];
		if (typeof this.hp != "number" || this.hp != this.hp)
			this.hp = this.maxhp;
		else
			this.hp = Math.floor(this.hp*this.maxhp/lastmax);
	}
	toNextLevel() {
		return forNextLevel(this.level) - this.experience;
	}
	equip(quip) {
		inventory.push(this.equipped[quip.slot]);
		this.equipped[quip.slot] = quip;
		this.recalculateStats();
	}
	setDisplay(x, y, width, height, listener, displayMode = PC_DISPLAYMODE_BASIC) {
		super.setDisplay(x, y, width, height, listener);
		this.displayMode = displayMode;
		if (this.displayMode == PC_DISPLAYMODE_EQUIP) {
			this.equipLabels = [];
			this.equipped.forEach((quip, dex, lisp) => {
				let lab = new Label(this.x+4+this.width/2*(dex%2), this.y+150+25*Math.floor(dex/2), this.width/2, 20, quip.name, quip.description, settings.normal_color, "left")
				this.equipLabels.push(lab);
				lab.slot = dex;
				lab.item = quip;
			});
		}
	}
	update() {
		super.update();
		if (this.displayMode == PC_DISPLAYMODE_EQUIP)
			this.equipLabels.forEach(oj=>oj.update());
	}
	draw(arg) {
		switch (this.displayMode) {
			case PC_DISPLAYMODE_BASIC: super.draw(); break;
			case PC_DISPLAYMODE_DETAIL: this.drawDetailed(); break;
			case PC_DISPLAYMODE_EQUIP: this.drawEquip(arg); break;
		}
	}
	drawDetailed() {
		ctx.fillStyle = settings.background_color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillStyle = this.color;
		ctx.textAlign = "left";
		ctx.font = "20px "+settings.font;
		ctx.fillText(this.name, this.x+4, this.y+4);
		this.drawHPBar(this.x, this.y+27, this.width, 15);
		ctx.fillStyle = settings.normal_color;
		var wid = this.width/(READABLE_STATS.length+1);
		drawTextInRect("stat", this.x, this.y+50, wid, 20);
		drawTextInRect("base", this.x, this.y+75, wid, 20);
		drawTextInRect("w/eq", this.x, this.y+100, wid, 20);
		drawTextInRect("curr", this.x, this.y+125, wid, 20);
		READABLE_STATS.forEach((stat, dex, lisp) => {
			var x = this.x+wid*(dex+1);
			drawTextInRect(STAT_ABBS[stat], x, this.y+50, wid, 20);
			drawTextInRect(this.baseStats[stat], x, this.y+75, wid, 20);
			drawTextInRect(this.stats[stat], x, this.y+100, wid, 20);
			drawTextInRect(this.getStat(stat), x, this.y+125, wid, 20);
		});
	}
	drawEquip(item) {
		ctx.fillStyle = settings.background_color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillStyle = this.color;
		ctx.textAlign = "left";
		ctx.font = "20px "+settings.font;
		ctx.fillText(this.name, this.x+4, this.y+4);
		this.drawHPBar(this.x, this.y+27, this.width, 15);
		ctx.fillStyle = settings.normal_color;
		var wid = this.width/(READABLE_STATS.length+1);
		drawTextInRect("stat", this.x, this.y+50, wid, 20);
		drawTextInRect("base", this.x, this.y+75, wid, 20);
		drawTextInRect("curr", this.x, this.y+100, wid, 20);
		var doPredict = item && item.statMods && item.equippableTo(this);
		if (doPredict)
			drawTextInRect("new", this.x, this.y+125, wid, 20);
		READABLE_STATS.forEach((stat, dex, lisp) => {
			var x = this.x+wid*(dex+1);
			drawTextInRect(STAT_ABBS[stat], x, this.y+50, wid, 20);
			drawTextInRect(this.baseStats[stat], x, this.y+75, wid, 20);
			drawTextInRect(this.stats[stat], x, this.y+100, wid, 20);
			if (doPredict)
				drawTextInRect(this.stats[stat] - this.equipped[item.slot].statMods[stat] + item.statMods[stat], x, this.y+125, wid, 20);
		});
		ctx.font = "20px "+settings.font;
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		this.equipLabels.forEach(oj=>{
			//console.log(this, oj, oj.slot, oj.item);
			if (this.equipped[oj.slot] != oj.item) {
				oj.text = this.equipped[oj.slot].name;
				oj.hoverText = this.equipped[oj.slot].description;
			}
			oj.draw();
		});
		/*this.equipped.forEach((quip, dex, lisp)=> {
			ctx.fillText(quip.name, this.x+4+this.width/2*(dex%2), this.y+150+25*Math.floor(dex/2));
		});*/
	}
}
PC.prototype.team = true;
PC.prototype.hpMult = 10;
PC.prototype.statMults = statsFromMults({}, 1.0);