uttt.game = {
	// move history
	moves_previous: [],
	moves_next: [],
	moves_position: 0, // number of completed moves at the current replay position
	moves_maximum: 0, // the number of moves that have taken place
	modifiers: 0, // 1 << x flags: 1: inverted, 2: quick, 3: blitz
	next_board: -1, // current board or -1 in the initial state
	has_turn: false, // whose turn -- is it the local player's?
	has_opponent: false, // Is there an opponent?
	boards: [0, 0, 0, 0, 0, 0, 0, 0, 0],
	
	// Reset the board
	reset: function(quick){
		uttt.game.moves_previous = [];
		uttt.game.moves_next = [];
		uttt.game.moves_position = 0;
		uttt.game.moves_maximum = 0;
		// uttt.game.modifiers
		uttt.game.next_board = -1;
		// uttt.game.has_turn
		// uttt.game.has_opponent
		uttt.game.boards = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		// Reset the UI's board
		uttt.ui.mark_boards(true);
		if(quick) return;
		$('game-btn').disabled = false;
		$('game-btn').value = uttt.lang.INGAME_BTN_FORFEIT;
		$('game-btn').onclick = uttt.ui.ingame_forfeit;
	},
	
	// Can a move be made?
	canMove: function(board, position, player){
		// Is the position occupied?
		if(uttt.game.boards[board] & (3 << (position << 1)))
			return false;
		// Special Checks
		if(!(uttt.game.modifiers & 8)){
			if(uttt.game.modifiers & 1){
				// inverted: cannot move if it will cause a win
				if(uttt.game.winner(uttt.game.boards[board] | (1 << ((position << 1) + player - 1))))
					if((uttt.game.modifiers & 2) ||
						uttt.game.winner(uttt.game.boards[9] | (1 << ((board << 1) + player - 1))))
						return false;
			}
			else if(uttt.game.modifiers & 2){
				// uninverted quick: cannot move if it will cause a loss
				var new_flags = uttt.game.boards[position];
				if(board == position) // allow blocking
					new_flags |= 1 << ((position << 1) + player - 1);
				if(uttt.game.nearWin(new_flags, player ^ 3))
					return false;
			}
			else{
				// normal: cannot move if it will cause a loss?
			}
		}
		return true;
	},

	// Check a board against some patterns
	check_patterns: function(board, patterns, masks){
		if(typeof masks == 'undefined') masks = patterns;
		// assert(masks.length == patterns.length)
		for(var i = 0; i < patterns.length; ++i)
			if((board & masks[i]) == patterns[i])
				return true;
		return false;
	},
	// Returns whether the board has an empty space
	hasSpace: function(board){
		return uttt.game.check_patterns(~board, uttt.patterns.empty_patterns);
	},
	// Returns whether the board is about to be won by a player
	nearWin: function(board, player){
		var patterns = player == 1 ? uttt.patterns.near_win_1 : uttt.patterns.near_win_2;
		return uttt.game.check_patterns(board, patterns, uttt.patterns.near_win_mask);
	},
	// Returns whether the board has been won
	winner: function(board){
		// Check if Player 1 wins
		if(uttt.game.check_patterns(board, uttt.patterns.win_patterns_1))
			return 1;
		// Check if Player 2 wins
		if(uttt.game.check_patterns(board, uttt.patterns.win_patterns_2))
			return 2;
		// No one wins
		return 0;
	},

	// Make a move
	move: function(board, position, player){
		++uttt.game.moves_position;
		uttt.game.has_turn ^= true;
		uttt.game.boards[board] |= 1 << ((position << 1) + player - 1);
		// Highlight square
		uttt.ui.mark(board, position, player);
		// If the destination board is already won or full, the next board is unrestricted
		if(uttt.game.winner(uttt.game.boards[position]) || !uttt.game.hasSpace(uttt.game.boards[position]))
			uttt.game.next_board = -1;
		else
			uttt.game.next_board = position;
		// Check if the board has been won
		if(uttt.game.winner(uttt.game.boards[board])){
			uttt.game.boards[9] |= 1 << ((position << 1) + player - 1);
			// Highlight board
			uttt.ui.mark(9, board, player);
		}
		uttt.ui.mark_boards();
	},
	// Reverse a move
	undo: function(board, position){
		--uttt.game.moves_position;
		uttt.game.has_turn ^= true;
		/* the previous move could have been done anywhere
		 * if it's the first move or
		 * if it's already won or
		 * if it's full */
		if(!uttt.game.moves_position || uttt.game.winner(uttt.game.boards[board]) || !uttt.game.hasSpace(uttt.game.boards[board]))
			uttt.game.next_board = -1;
		else
			uttt.game.next_board = board;
		// Unset the move
		uttt.game.boards[board] &= ~(3 << (position << 1));
		// Remove highlight from square
		uttt.ui.mark(board, position, 0);
		// Check if the board is no longer won
		if(!uttt.game.winner(uttt.game.boards[board])){
			uttt.game.boards[9] &= ~(3 << (position << 1));
			// Remove highlight from board
			uttt.ui.mark(9, board, 0);
		}
		uttt.ui.mark_boards();
	}
};
