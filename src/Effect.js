var Effect = {
	tick : function() {
		this.duration--;
		return (this.duration > 0);
	},
	attempt : function(user, target, dmg) {
		this.apply(user, target, dmg);
	},
	apply : function(user, target, dmg) {
		if (this.target)
			target.addEffect(this);
		else
			user.addEffect(this);
	},
	effectOnStat : function(statName) {
		return 0;
	},
	getDescription : function() {
		
	},
	getDescriptionApplied : function() {
		
	},
}

/*BattleAction.tryEffect = function(messageList, attacker, defender, dmg) {
	if (!this.hasEffect())
		return;
	var thisser = this;
	var rate = this.hitrate;
	var acc = attacker.getStat(this.effectAccuracyStat);
	var eva = defender.getStat(this.effectEvasionStat);
	var truerate = rate * acc / (rate * acc + (1-rate) * eva);
	
	var hit = (Math.random() < truerate);
	if (Math.random() < truerate || attacker.team == defender.team) {
		this.applyEffect(messageList, attacker, defender, dmg);
	} else {
		//messageList.push(function(){target.dodge(0)});
		messageList.push(new DialogLine("Battle", null, "The effect fails to take hold on "+defender.name+".", MESSAGE_TIME));
	}
}

BattleAction.applyEffect = function(messageList, attacker, defender, dmg) {
	messageList.push(function(){defender.addEffect(new Effect(thisser, thisser.effectStat, thisser.effectAmount, thisser.effectDuration))});
	messageList.push(new DialogLine("Battle", null, defender.name + "'s " + thisser.effectStat + " is changed by " + thisser.effectStat + ".", MESSAGE_TIME));
}

BattleAction.getEffectRate = function(attacker, defender) {
	var rate = this.effectRate;
	var acc = attacker.getStat(this.effectAccuracyStat);
	var eva = defender.getStat(this.effectEvasionStat);
	var truerate = rate * acc / (rate * acc + (1-rate) * eva);
	return truerate;
}*/

var BasicEffect = {
	statChangeMults : statsToArray({}, 0),
	resistances : attributesToArray({}, 0),
	effectOnStat(stat) {
		return this.statChanges[stat] || (this.statChangeMults[stat] * this.source.level);
	},
	getDescription : function() {
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
	},
	getDescriptionApplied : function() {
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
Object.setPrototypeOf(BasicEffect, Effect);


var BasicEffectPhysic = {
	magic : false,
	//statChangeMults : statsToArray({}, 0),
	//resistances : attributesToArray({}, 0),
	effectOnStat(stat) {
		return this.statChangeMults[stat] * this.source.level;
	},
}
Object.setPrototypeOf(BasicEffectPhysic, BasicEffect);


var BasicEffectMagic = {
	magic : true,
	effectOnStat(stat) {
		return this.statChanges[stat];
	},
}
Object.setPrototypeOf(BasicEffectMagic, BasicEffect);

/*SingleBuff = {
	__proto__ : Object.create(Effect),
	target : true,
	effectOnStat(stat) {
		if (stat == this.stat)
			return this.amount;
		else return 0;
	},
}
SingleNerf = {
	__proto__ : Object.create(Effect),
	target : true,
	effectOnStat(stat) {
		if (stat == this.stat)
			return -this.amount;
		else return 0;
	},
	getDescription : function() {
		return "Nerfs "+(this.target?"target":"user")+"'s "+this.stat+" by "+this.amount+" for "+this.duration;
	}
}*/