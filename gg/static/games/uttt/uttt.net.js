uttt.net = {
	p_id: 0, // server identifier for player
	g_id: 0, // server identifier for game
	get_id: function (){ return 'g=' + uttt.net.g_id + '&p=' + uttt.net.p_id; },
	send_: function(type, info, callback){ return gg.net.send('uttt/' + type, info, callback); },
	send: function(type, callback) { return uttt.net.send_(type, uttt.net.get_id(), callback); },
	// Handlers
	connect: function(params, callback){
		uttt.net.send_('connect', params, function(data){
			callback(data);
			gg.net.receive("uttt/poll", uttt.net.get_id(), uttt.net.received);
		});
	},
	leave: function(callback){
		gg.net.receive_stop();
		uttt.net.send("disconnect",
			/*function(data){
				uttt.net.g_id = 0;
				uttt.net.p_id = 0;
				callback(data);
			}*/ callback);
	},
	// Listener
	received: function(data){
		if(!data[0]) return;
		data = data[1];
		// Process every message
		for(var i = 0; i < data.length; ++i){
			var message = data[i];
			switch(message[0]){
				case 'join':
					$('players-remote').innerText = message[1];
					uttt.game.modifiers = message[2];
					uttt.ui.ingame_start(message[3], 1);
					break;
				case 'start':
					uttt.ui.ready = 3;
					uttt.game.has_turn = message[1];
					// fallthrough
				case 'ready':
					uttt.ui.ready |= 2;
					if(uttt.ui.ready == 3)
						uttt.game.reset();
					uttt.ui.update_ready_message(true);
					break;
				case 'move': // by opponent
					if(uttt.game.moves_next.length){
						// This is an exception to the stack usage
						uttt.game.moves_next.unshift([message[1], message[2], uttt.game.has_turn ? 1 : 2]);
					}
					else{
						uttt.game.move(message[1], message[2], uttt.game.has_turn ? 1 : 2);
						uttt.game.moves_previous.push([message[1], message[2], uttt.game.has_turn ? 1 : 2]);
					}
					uttt.ui.update_ready_message(true);
					break;
				case 'win':
					// If you make a move and win, it will be the opponent's turn
					uttt.ui.intermission(uttt.game.has_turn ? uttt.lang.INGAME_LOSE : uttt.lang.INGAME_WIN);
					uttt.ui.win(uttt.game.has_turn ? 2 : 1);
					break;
				case 'forfeit':
					uttt.ui.intermission(uttt.lang.INGAME_FORFEIT);
					uttt.ui.win(1);
					break;
				case 'tie':
					uttt.ui.intermission(uttt.lang.INGAME_TIE);
					uttt.ui.win(3);
					break;
				case 'leave':
					uttt.ui.ready = 0;
					gg.net.receive_stop();
					$('game-btn').disabled = true;
					$('uttt-game-status').innerHTML = uttt.lang.INGAME_TITLE_LEAVE;
					$('game-status').innerHTML = uttt.lang.INGAME_LEFT;
					break;
			}
		}
	}
};