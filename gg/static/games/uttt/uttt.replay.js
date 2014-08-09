// Replay functionality
uttt.replay = {
	// Public UI functions
	back: function(){
		if(!uttt.game.moves_position) return;
		uttt.replay.rewind_one();
		uttt.replay.recalc_bar();
	},
	forward: function(){
		if(!uttt.game.moves_next.length) return;
		uttt.replay.forward_one();
		uttt.replay.recalc_bar();
	},
	recalc_bar: function(){
		var progress = uttt.game.moves_position;
		var total = progress + uttt.game.moves_next.length;
		if(!total)
			progress = total = 1;
		$('progress').style.width = (progress * 100 / total) + '%';
	},
	// Move the board state forward by one.
	forward_one: function(){
		var move = uttt.game.moves_next.pop();
		uttt.game.move(move[0], move[1], move[2]);
		uttt.game.moves_previous.push(move);
	},
	// Rewind the board state using the move history.
	rewind_one: function(){
		var move = uttt.game.moves_previous.pop();
		uttt.game.undo(move[0], move[1]);
		uttt.game.moves_next.push(move);
	},
	// Return to the present state.
	forward_all: function(){
		while(uttt.game.moves_next.length)
			forward_one();
	},
	/*
	 * Rewind the board to the beginning, when
	 * no moves have been made.
	 */
	rewind_all: function(){
		while(uttt.game.moves_previous.length)
			rewind_one();
	}
};
