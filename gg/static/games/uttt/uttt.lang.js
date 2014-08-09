uttt.langs['en'] = {
	// Disconnected
	BTN_READY: "I'm Ready!",
	BTN_UNREADY: "I'm not ready anymore",
	WAITING_TITLE_DISCONNECTED: "Select options",
	WAITING_DISCONNECTED: "Click the ready button!",
	WAITING_TITLE_NOOPPONENT: "Wait for an opponent&hellip;",
	WAITING_NOOPPONENT: "Ask your friend to join you!",
	// In-game but waiting
	INGAME_TITLE_WAIT: "Intermission&hellip;",
	INGAME_TITLE_WAIT_TIME: function(t){ return "Intermission: " + t + " seconds left"; },
	INGAME_WAITING: "Get ready and click the ready button!",
	INGAME_READY_LOCAL: "The game is going to begin soon!",
	INGAME_READY_OPP: "Your opponent is <b>waiting</b> for you!",
	INGAME_BTN_DISCONNECT: "Stop Playing",
	INGAME_BTN_READY: "I'm Ready",
	// In-game and ready
	INGAME_TITLE_LOCAL: function(t){ return "It's your turn! " + t + " seconds left"; },
	INGAME_TITLE_OPP: function(t){ return "Wait for the opponent to move&hellip; " + t + " seconds left"; },
	INGAME_TITLE_LEAVE: "No opponent",
	INGAME_LOCAL: "Make a move!",
	INGAME_INVALID_MOVE: "Make a different move; that one is invalid.",
	INGAME_NOT_TURN: "It's not your turn yet!",
	INGAME_NOT_STARTED: "The game hasn't started yet.",
	INGAME_OPP: "Wait for the opponent.",
	INGAME_WIN: "You have <b>won</b> this round!",
	INGAME_LOSE: "You have <b>lost</b> this round!",
	INGAME_TIE: "It's a draw; the board is full.",
	INGAME_FORFEIT: "Your opponent forfeited this round.",
	INGAME_FORFEIT_LOCAL: "You have forfeited this round.",
	INGAME_LEFT: "Your opponent has left the game.",
	INGAME_BTN_FORFEIT: "Forfeit",
	// Player list
	STATIC_PLAYERLIST: "Players",
	STATIC_PLAYERLIST_LOCAL: " (you)",
	// Modifiers
	STATIC_MOD: "Modifiers",
	STATIC_MOD_DESC: "Change the rules!",
	STATIC_MOD0: "Inverted", // also with buttons
	STATIC_MOD1: "Quick",
	STATIC_MOD2: "Blitz",
	STATIC_MOD3: "Expert",
	STATIC_MOD_DESC0: "The winner and loser are swapped, but only legal moves may be used.",
	STATIC_MOD_DESC1: "Capture one small board to win.",
	STATIC_MOD_DESC2: "A random move will be made after 5 seconds instead of the regular 15.",
	STATIC_MOD_DESC3: "Allow all moves; moves are unrestricted.",
	MOD_LOCAL: "YOU",
	MOD_OPP: "OPP",
	MOD_MESSAGE: function(state, whose){
		return "This option is <b>" + state + "</b>" +
			(whose ? " because the server picked <b>" + whose + "</b> choice." : ".");
	},
	MOD_MESSAGE_ON: "on",
	MOD_MESSAGE_OFF: "off",
	MOD_MESSAGE_LOCAL: "your",
	MOD_MESSAGE_OPP: "your opponent's"
};