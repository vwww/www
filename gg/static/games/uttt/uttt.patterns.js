uttt.patterns = {
	// test against inverted board
	empty_patterns: [
		3,     // 0b000000000000000011
		12,    // 0b000000000000001100
		48,    // 0b000000000000110000
		192,   // 0b000000000011000000
		768,   // 0b000000001100000000
		3072,  // 0b000000110000000000
		12288, // 0b000011000000000000
		49152, // 0b001100000000000000
		196608 // 0b110000000000000000
	],
	// Player 1 has won
	win_patterns_1: [
		// horizontal
		86016, // 0b010101000000000000
		1344,  // 0b000000010101000000
		21,    // 0b000000000000010101
		// vertical
		66576, // 0b010000010000010000
		16644, // 0b000100000100000100
		4161,  // 0b000001000001000001
		// diagonals
		65793, // 0b010000000100000001
		4368   // 0b000001000100010000
	],
	// Player 2 has won
	win_patterns_2: [
		// horizontal
		172032, // 0b101010000000000000
		2688,   // 0b000000101010000000
		42,     // 0b000000000000101010
		// vertical
		133152, // 0b100000100000100000
		33288,  // 0b001000001000001000
		8322,   // 0b000010000010000010
		// diagonals
		131586, // 0b100000001000000010
		8736    // 0b000010001000100000
	],
	near_win_mask: [ // Which squares will be checked?
		// horizontal
		258048, // 0b111111000000000000
		258048, // 0b111111000000000000
		258048, // 0b111111000000000000
		4032,   // 0b000000111111000000
		4032,   // 0b000000111111000000
		4032,   // 0b000000111111000000
		63,     // 0b000000000000111111
		63,     // 0b000000000000111111
		63,     // 0b000000000000111111
		// vertical
		199728, // 0b110000110000110000
		199728, // 0b110000110000110000
		199728, // 0b110000110000110000
		49932,  // 0b001100001100001100
		49932,  // 0b001100001100001100
		49932,  // 0b001100001100001100
		12483,  // 0b000011000011000011
		12483,  // 0b000011000011000011
		12483,  // 0b000011000011000011
		// diagonals
		197379, // 0b110000001100000011
		197379, // 0b110000001100000011
		197379, // 0b110000001100000011
		13104,  // 0b000011001100110000
		13104,  // 0b000011001100110000
		13104   // 0b000011001100110000
	],
	near_win_1: [ // Player 1 can win on the next move
		// horizontal
		20480, // 0b000101000000000000
		69632, // 0b010001000000000000
		81920, // 0b010100000000000000
		320,   // 0b000000000101000000
		1088,  // 0b000000010001000000
		1280,  // 0b000000010100000000
		5,     // 0b000000000000000101
		17,    // 0b000000000000010001
		20,    // 0b000000000000010100
		// vertical
		1040,  // 0b000000010000010000
		65552, // 0b010000000000010000
		66560, // 0b010000010000000000
		260,   // 0b000000000100000100
		16388, // 0b000100000000000100
		16640, // 0b000100000100000000
		65,    // 0b000000000001000001
		4097,  // 0b000001000000000001
		4160,  // 0b000001000001000000
		// diagonals
		257,   // 0b000000000100000001
		65537, // 0b010000000000000001
		65792, // 0b010000000100000000
		272,   // 0b000000000100010000
		4112,  // 0b000001000000010000
		4352   // 0b000001000100000000
	],
	near_win_2: [ // Player 2 can win on the next move
		// horizontal
		40960,  // 0b001010000000000000
		139264, // 0b100010000000000000
		163840, // 0b101000000000000000
		640,    // 0b000000001010000000
		2176,   // 0b000000100010000000
		2560,   // 0b000000101000000000
		10,     // 0b000000000000001010
		34,     // 0b000000000000100010
		40,     // 0b000000000000101000
		// vertical
		2080,   // 0b000000100000100000
		131104, // 0b100000000000100000
		133120, // 0b100000100000000000
		520,    // 0b000000001000001000
		32776,  // 0b001000000000001000
		33280,  // 0b001000001000000000
		130,    // 0b000000000010000010
		8194,   // 0b000010000000000010
		8320,   // 0b000010000010000000
		// diagonals
		514,    // 0b000000001000000010
		131074, // 0b100000000000000010
		131584, // 0b100000001000000000
		544,    // 0b000000001000100000
		8224,   // 0b000010000000100000
		8704    // 0b000010001000000000
	]
};
