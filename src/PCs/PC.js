var PC = {
	team : true,
	hpMult : 10,
	recalculateStats : function() {
		var thisser = this;
		this.stats = this.baseStats.slice();
		this.effectiveness = this.baseEffectiveness.slice();
		this.equipped.forEach(function(quip) {
			//console.log(quip);
			quip.statMods.forEach(function(mod, dex) {
				thisser.stats[dex] += mod;
			});
			//console.log(quip.attributeResists);
			quip.attributeResists.forEach(function(res, dex) {
				thisser.effectiveness[dex] -= res;
			});
		});
		var lastmax = this.maxhp;
		this.maxhp = this.hpMult * this.stats[STAT_INDICES.Vitality];
		if (this.hp == undefined)
			this.hp = this.maxhp;
		else
			this.hp = Math.floor(this.hp*this.maxhp/lastmax);
	},
	toNextLevel : function() {
		return forNextLevel(this.level) - this.experience;
	},
	equip : function(quip) {
		inventory.push(this.equipped[quip.slot]);
		this.equipped[quip.slot] = quip;
		this.recalculateStats();
	},
}
Object.setPrototypeOf(PC, Unit);