class Effect {
	constructor(source) {
		this.source = source;
		this.level = this.source.level;
		if (this.source instanceof Technique) {
			this.statChanges = this.statChangeMults.map(n=>n*this.level);
		}
		if (typeof this.magic != "boolean")
			this.magic = (this.source instanceof Spell);
		this.duration = this.maxDuration;
	}
	tick() {
		this.duration--;
		return (this.duration > 0);
	}
	attempt(user, target, dmg) {
		this.apply(user, target, dmg);
	}
	apply(user, target, dmg) {
		if (this.target)
			target.addEffect(this);
		else
			user.addEffect(this);
	}
	effectOnStat(stat) {
		return this.statChanges[stat];
	}
	getDescription() {
		var toret = this.target ? "Target's " : "User's ";
		var comma = false;
		for (var i = 0; i < STAT_NAMES.length; i++) {
			let fec = this.effectOnStat(i);
			if (fec) {
				if (comma)
					toret += ", ";
				else
					comma = true;
				if (fec > 0)
					toret += STAT_ABBS[i] + " +" + fec;
				else
					toret += STAT_ABBS[i] + " " + fec;
			}
		}
		return toret + " for " + this.duration;
	}
	getDescriptionApplied() {
		var lines = [];
		for (var i = 0; i < STAT_NAMES.length; i++) {
			let fec = this.effectOnStat(i);
			if (fec > 0)
				lines.push(STAT_NAMES[i] + " buffed  by " + fec);
			else if (fec < 0)
				lines.push(STAT_NAMES[i] + " nerfed  by " + (-fec));
		}
		return lines;
	}
}
Effect.prototype.statChanges = statsToArray({}, 0);
Effect.prototype.resistances = attributesToArray({}, 0);
Effect.prototype.rate = 1.0;