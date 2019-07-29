const CHAR_SPRITES = {
	/*Lluvia : {
		
	},*/
	Claire : {
		DialogNormal : {x:0, y:0, width:500, height:680},
		Pointing : {x:500, y:0, width:500, height:680},
	},
	Manz : {
		DialogNormal : {x:0, y:0, width:610, height:830},
		Normal : {x:700, y:900, width:200, height:300},
		Cast : {x:900, y:900, width:200, height:300},
		Attack : {x:1100, y:900, width:200, height:300},
	},
	Marcel : {
		DialogNormal : {x:0, y:0, width:610, height:832},
		Normal : {x:700, y:900, width:200, height:300},
		Attack : {x:900, y:900, width:200, height:300},
		//Dodge : {x:700, y:900, width:200, height:300},
	},
	Mtreac : {
		DialogNormal : {x:0, y:0, width:500, height:750},//width:286, height:550},
	},
	Poslo : {
		DialogNormal : {x:0, y:0, width:400, height:555},
	},
	Vertace : {
		DialogNormal : {x:0, y:0, width:400, height:555},
	},
}

for (kar in CHAR_SPRITES) {
	var mag = makeImage("src/CharacterImages/"+kar+".png");
	CHAR_SPRITES[kar].image = mag;
	for (typ in CHAR_SPRITES[kar]) {
		CHAR_SPRITES[kar][typ].parent = kar;
		CHAR_SPRITES[kar][typ].image = mag;
	}
};

//CHAR_SPRITES["M'treac"] = CHAR_SPRITES["Mtreac"];
