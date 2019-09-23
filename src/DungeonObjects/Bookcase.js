const BOOKCASE_THICKNESS = 6;
const BOOKCASE_RIGHT = "right";
class Bookcase extends DungeonObject {
	constructor(x, y, width, height, shelves) {
		super(x, y, width, height);
		this.colorF = "#BF5019";
		this.colorB = "#AF4009";
		this.books = [];
		this.numShelves = shelves.length;
		shelves.forEach((shelf, sdex, sray) => {
			let cx = this.x + BOOKCASE_THICKNESS;
			let by = this.y + (sdex+1) * (this.height-BOOKCASE_THICKNESS) / sray.length;
			shelf.forEach((book, dex) => {
				if (book == BOOKCASE_RIGHT) {
					cx = this.x + this.width - BOOKCASE_THICKNESS;
					shelf.slice(dex+1).forEach(boook => {
						if (typeof boook == "number") {
							cx -= boook;
						} else {
							cx -= boook.width;
						}
					});
				} else if (typeof book == "number") {
					cx += book;
				} else {
					book.x = cx;
					book.y = by - book.height;
					cx += book.width;
					this.books.push(book);
				}
			});
		});
		//this.books = [].concat(...shelves);
	}
	update(cam) {
		this.books.forEach(oj=>oj.update(cam));
	}
	draw(cam) {
		cam.drawRect(this.x, this.y, this.width, this.height, 1, this.colorB, "#000000");
		for (var i = 0; i <= this.numShelves; i++) {
			cam.drawRect(this.x, this.y + i * (this.height-BOOKCASE_THICKNESS) / this.numShelves, this.width, BOOKCASE_THICKNESS, 1, this.colorF, "#000000");
		}
		cam.drawRect(this.x, this.y, BOOKCASE_THICKNESS, this.height, 1, this.colorF, "#000000");
		cam.drawRect(this.x + this.width - BOOKCASE_THICKNESS, this.y, BOOKCASE_THICKNESS, this.height, 1, this.colorF, "#000000");
		this.books.forEach(oj=>oj.draw(cam));
	}
}

class Book extends DungeonObject {
	constructor(width, height, color, title, dialog) {
		super(0, 0, width, height);
		this.color = color;
		this.title = title;
		this.lines = Array.prototype.slice.call(arguments, 4).map(thing => typeof thing == "string" ? new DialogLine("Book", null, thing) : thing);
	}
	update(cam) {
		super.update(cam);
		this.beingRead = false;
		if (this.hovered)
			infoField.setText(this.title);
		if (this.clicked) {
			this.beingRead = true;
			dialog.begin(this.lines);
		}
	}
	draw(cam) {
		if (!this.beingRead) {
			cam.drawRect(this.x, this.y, this.width, this.height, 1, this.color, "#000000");
		}
	}
}