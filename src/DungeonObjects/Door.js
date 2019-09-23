class BasicDoor extends DungeonObject {
	constructor(image, midx, floory) {
		let width = image.width;
		let height = image.height;
		super(midx - width/2, floory - height, width, height);
		this.image = image;
	}
	update(cam) {
		super.update(cam);
		if (this.hovered) {
			infoField.setText(this.hoverText);
		}
		if (this.clicked && (!this.openCond || this.openCond())) {
			cam.moveTo(this.destination);
		}
	}
	draw(cam) {
		cam.drawSprite(this.image, this.x, this.y);
	}
}
BasicDoor.prototype.bindForward = true;
BasicDoor.prototype.hoverText = "This negative object which stands before me is in all likelihood a doorway of some variety.";

class LockedDoor extends BasicDoor {
	constructor(sprites, midx, floory, openCond) {
		super(sprites.closed, midx, floory);
		this.sprites = sprites;
		this.openCond = openCond;
	}
	draw(cam) {
		cam.drawSprite(this.openCond() ? this.sprites.open : this.sprites.closed, this.x, this.y);
	}
}

class SealedDoor extends LockedDoor {
	constructor(sprites, midx, floory, sealData) {
		super(sprites, midx, floory, ()=>Math.min(...(sealData.map(oj=>!!oj.cond()))));
		this.sprites = sprites;
		this.seals = sealData.map(dat => new DoorSeal(this, dat));
	}
	draw(cam) {
		super.draw(cam);
		this.seals.forEach(oj=>oj.draw(cam));
	}
}

class DoorSeal extends DungeonObject {
	constructor(parent, stuff) {
		var baseSprite = parent.sprites.seal
		super(parent.x + parent.width * stuff.widthMult - baseSprite.width/2, parent.y + parent.height * stuff.heightMult - baseSprite.height/2, baseSprite.width, baseSprite.height);
		this.parent = parent;
		this.cond = stuff.cond;
		this.spriteSealed = this.parent.sprites.seal;
		this.spriteUnsealed = this.parent.sprites.unseal;
	}
	draw(cam) {
		ctx.globalAlpha = 1;
		//cam.fillRect(this.x, this.y, this.width, this.height, "#FFFFFF");
		//console.log(cam);
		cam.drawSprite(this.cond() ? this.spriteUnsealed : this.spriteSealed, this.x, this.y);
	}
}