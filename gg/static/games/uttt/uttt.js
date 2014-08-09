var uttt = {
	// Constants
	TIME_INTERMISSION: 30000,
	TIME_MOVE: 15000,
	TIME_MOVE_BLITZ: 5000,
	// Localization
	lang: false,
	langs: {}
	// externs
	// ui: null,
	// net: null,
	// game: null,
	// replay: null,
	// patterns: null
};
// Startup script
window.addEventListener('load', function(){
	uttt.lang = uttt.langs['en'];
	// Create handlers for the board elements
	for(var board = 0; board < 9; ++board){
		var board_element = $('uttt-' + board);
		for(var row = 0; row < 3; ++row)
			for(var cell = 0; cell < 3; ++cell)
				board_element.rows[row].cells[cell].onclick = (function(){
					// Use a closure to return the callback, which has another closure!
					var call_board = board;
					var call_position = row * 3 + cell;
					return function(){
						uttt.ui.select_square(call_board, call_position);
					};
				})();
	}
	// Set default text
	// TODO: move to UI
	$('lobby-button').value = uttt.lang.BTN_READY;
	$('lobby-status').innerHTML = uttt.lang.WAITING_TITLE_DISCONNECTED;
	$('lobby-status-small').innerHTML = uttt.lang.WAITING_DISCONNECTED;
	$('lobby-option-span0').innerHTML = uttt.lang.STATIC_MOD0;
	$('lobby-option-span1').innerHTML = uttt.lang.STATIC_MOD1;
	$('lobby-option-span2').innerHTML = uttt.lang.STATIC_MOD2;
	$('lobby-option-span3').innerHTML = uttt.lang.STATIC_MOD3;
	$('mod-name0').innerHTML = uttt.lang.STATIC_MOD0;
	$('mod-name1').innerHTML = uttt.lang.STATIC_MOD1;
	$('mod-name2').innerHTML = uttt.lang.STATIC_MOD2;
	$('mod-name3').innerHTML = uttt.lang.STATIC_MOD3;
	$('game-btn-disconnect').value = uttt.lang.INGAME_BTN_DISCONNECT;
	$('game-btn').value = uttt.lang.INGAME_BTN_READY;
	$('uttt-game').className = 'hide';
	// TODO decide the mod box better
	$('mod-desc0').innerHTML = $('mod-desc0').innerHTML.replace('STATIC_MOD_DESC0', uttt.lang.STATIC_MOD_DESC0);
	$('mod-desc1').innerHTML = $('mod-desc1').innerHTML.replace('STATIC_MOD_DESC1', uttt.lang.STATIC_MOD_DESC1);
	$('mod-desc2').innerHTML = $('mod-desc2').innerHTML.replace('STATIC_MOD_DESC2', uttt.lang.STATIC_MOD_DESC2);
	$('mod-desc3').innerHTML = $('mod-desc3').innerHTML.replace('STATIC_MOD_DESC3', uttt.lang.STATIC_MOD_DESC3);
	console.log("v1");
}, false);
window.addEventListener("beforeunload", function() {
	if(!gg.net.is_receiving)
		return;
	// Disconnect from the match
	// TODO: disconnections
	return "You are disconnecting from the match.";
});
