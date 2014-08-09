uttt.ui = {
	// In Lobby
	lobby_ready: function(){
		// Create a game
		$('lobby-button').disabled = true;
		$('lobby-option1').disabled = true;
		$('lobby-option2').disabled = true;
		$('lobby-option3').disabled = true;
		var options = 0;
		if($('lobby-option1').checked)
			options = 1;
		if($('lobby-option2').checked)
			options |= 2;
		if($('lobby-option3').checked)
			options |= 4;
		if($('lobby-option4').checked)
			options |= 8;
		uttt.net.connect('n=' + encodeURIComponent(gg.nickname.getName()) + '&options=' + options, function(data){
			// [has_match, player_id, game_id(, first_player, game_options)]
			uttt.net.p_id = data[1];
			uttt.net.g_id = data[2];
			$('players-local').innerText = data[3];
			$('players-local-wins').innerText = 0;
			$('players-remote-wins').innerText = 0;
			if(data[0]){
				$('players-remote').innerText = data[4];
				uttt.game.modifiers = data[5];
				// Flip the choice flags
				uttt.ui.ingame_start(data[6], 2);
			}
			else{
				uttt.game.has_opponent = false;
				$('lobby-button').onclick = uttt.ui.lobby_unready;
				$('lobby-button').disabled = false;
				$('lobby-button').value = uttt.lang.BTN_UNREADY;
				$('lobby-status').innerHTML = uttt.lang.WAITING_TITLE_NOOPPONENT;
				$('lobby-status-small').innerHTML = uttt.lang.WAITING_NOOPPONENT;
			}
		});
	},
	lobby_unready: function(){
		// Leave the game attempt
		$('lobby-button').disabled = true;
		uttt.net.leave(function(data){
			$('lobby-button').onclick = uttt.ui.lobby_ready;
			$('lobby-button').disabled = false;
			$('lobby-button').value = uttt.lang.BTN_READY;
			$('lobby-option1').disabled = false;
			$('lobby-option2').disabled = false;
			$('lobby-option3').disabled = false;
			$('lobby-status').innerHTML = uttt.lang.WAITING_TITLE_DISCONNECTED;
			$('lobby-status-small').innerHTML = uttt.lang.WAITING_DISCONNECTED;
			$('players-local').innerText = '';
		});
	},
	// In-Game
	ready: 0, // 0: intermission, 1: local player, 2: opponent, 3: active game
	ready_time: 0,
	ready_timer: 0,
	update_ready_message: function(firstcall){
		if(firstcall){
			if(uttt.ui.ready_timer){
				clearTimeout(uttt.ui.ready_timer);
				uttt.ui.ready_timer = 0;
			}
			uttt.ui.ready_time = (new Date).getTime();
		}
		if(!uttt.ui.ready)
			return;
		var remain = uttt.ui.ready_time - (new Date).getTime();
		if (uttt.ui.ready == 3){
			remain = ((remain + (uttt.game.modifiers & 4 ? uttt.TIME_MOVE_BLITZ : uttt.TIME_MOVE)) / 1000).toFixed(1);
			if(uttt.game.has_turn || uttt.game.moves_next.length){
				$('uttt-game-status').innerHTML = uttt.lang.INGAME_TITLE_LOCAL(remain);
				if(firstcall)
					$('game-status').innerHTML = uttt.lang.INGAME_LOCAL;
			}
			else{
				$('uttt-game-status').innerHTML = uttt.lang.INGAME_TITLE_OPP(remain);
				if(firstcall)
					$('game-status').innerHTML = uttt.lang.INGAME_OPP;
			}
		}
		else{
			remain = ((remain + uttt.TIME_INTERMISSION) / 1000).toFixed(1);
			if(firstcall)
				if(uttt.ui.ready == 1)
					$('game-status').innerHTML = uttt.lang.INGAME_READY_LOCAL;
				else // if (uttt.ui.ready == 2)
					$('game-status').innerHTML = uttt.lang.INGAME_READY_OPP;
			$('uttt-game-status').innerHTML = uttt.lang.INGAME_TITLE_WAIT_TIME(remain);
		}
		uttt.ui.ready_timer = window.setTimeout(uttt.ui.update_ready_message, 100);
	},
	ingame_start: function(option_choices, player){
		uttt.game.reset(true);
		$('lobby').className = 'hide';
		$('uttt-game').className = '';
		// Update modifiers
		for(var i = 0; i < 4; ++i){
			var onoff = (uttt.game.modifiers & (1 << i)) ? uttt.lang.MOD_MESSAGE_ON : uttt.lang.MOD_MESSAGE_OFF;
			$('mod-indicator' + i).innerHTML = (option_choices[i] ?
				option_choices[i] == player ?
					uttt.lang.MOD_LOCAL :
					uttt.lang.MOD_OPP :
				'') + '<br/><span>' + onoff + '</span>';
			$('mod' + i).innerHTML = uttt.lang.MOD_MESSAGE(onoff, option_choices[i] ?
				option_choices[i] == player ?
					uttt.lang.MOD_MESSAGE_LOCAL :
					uttt.lang.MOD_MESSAGE_OPP :
				'');
		}
		// Start intermission
		uttt.ui.intermission(uttt.lang.INGAME_WAITING);
	},
	ingame_ready: function(){
		$('game-btn').disabled = true;
		uttt.net.send("ready", function(data){
			if(!data[0]) return;
			if(data[1]){
				uttt.game.has_turn = data[2];
				uttt.ui.ready = 3;
			}
			uttt.ui.ready |= 1;
			if(uttt.ui.ready == 3)
				uttt.game.reset();
			uttt.ui.update_ready_message(true);
		});
	},
	ingame_forfeit: function(){
		// Give up the round
		uttt.net.send("forfeit", function(data){
			uttt.ui.intermission(uttt.lang.INGAME_FORFEIT_LOCAL);
			uttt.ui.win(2);
		});
	},
	ingame_disconnect: function(){
		// Leave the match
		uttt.net.leave(function(data){
			$('lobby').className = '';
			$('uttt-game').className = 'hide';
			// TODO clear the mod box better
			$('lobby-button').onclick = uttt.ui.lobby_ready;
			$('lobby-button').disabled = false;
			$('lobby-button').value = uttt.lang.BTN_READY;
			$('lobby-option1').disabled = false;
			$('lobby-option2').disabled = false;
			$('lobby-option3').disabled = false;
			$('lobby-status').innerHTML = uttt.lang.WAITING_TITLE_DISCONNECTED;
			$('lobby-status-small').innerHTML = uttt.lang.WAITING_DISCONNECTED;
			$('players-local').innerText = $('players-remote').innerText = '';
		});
	},
	select_square: function(board, position){
		// Do not make a move if the state is rewinded
		if(uttt.game.moves_next.length)
			return;
		uttt.net.send_("move", uttt.net.get_id() + "&b=" + board + "&n=" + position, function(data){
			if(data[0]) // forward valid moves to the standard handler
				uttt.net.received([true, data[1]]);
			else{
				// Display error message:
				if(data[1] == 1)
					$('game-status').innerHTML = uttt.lang.INGAME_INVALID_MOVE;
				else if(data[1] == 2)
					$('game-status').innerHTML = uttt.lang.INGAME_NOT_TURN;
				else if(data[1] == 3)
					$('game-status').innerHTML = uttt.lang.INGAME_NOT_STARTED;
				else
					$('game-status').innerHTML = "(unknown move error)";
			}
		});
	},
	// Private functions
	intermission: function(msg){
		uttt.ui.ready = 0;
		$('game-btn').disabled = false;
		$('game-btn').value = uttt.lang.INGAME_BTN_READY;
		$('game-btn').onclick = uttt.ui.ingame_ready;
		$('uttt-game-status').innerHTML = uttt.lang.INGAME_TITLE_WAIT;
		$('game-status').innerHTML = msg;
	},
	win: function(player){
		if(player == 1)
			$('players-local-wins').innerText = parseInt($('players-local-wins').innerText) + 1;
		else if(player == 2)
			$('players-remote-wins').innerText = parseInt($('players-remote-wins').innerText) + 1;
		// else // TODO: have a tie counter?
	},
	mark: function(board, position, player){
		if(board == 9) // mark the big board
			var square = $('uttt-' + position);
		else // mark the small board
			var square = $('uttt-' + board).rows[Math.floor(position / 3)].cells[position % 3];
		if(!player) // remove mark
			square.className = '';
		else // mark
			square.className = 'p' + player;
	},
	mark_boards: function(new_game){
		for(var board = 0; board < 9; ++board){
			var square = $('uttt-' + board);
			var board_allowed = uttt.game.next_board == board || uttt.game.next_board == -1;
			// Don't overwrite won boards
			if(new_game || (square.className != 'p1' && square.className != 'p2'))
				// Mark the board
				square.className = board_allowed ? 'p3' : '';
			// Mark the available squares
			for(var row = 0; row < 3; ++row)
				for(var col = 0; col < 3; ++col) {
					var cell = square.rows[row].cells[col];
					if(new_game)
						cell.className = 'p3';
					// Don't overwrite players' squares
					else if(cell.className != 'p1' && cell.className != 'p2') {
						if(board_allowed && uttt.game.canMove(board, row * 3 + col, uttt.game.has_turn ? 1 : 2))
							cell.className = 'p3';
						else
							cell.className = '';
					}
				}
		}
	}
};
