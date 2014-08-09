var gg = {
	net: {
		// Client -> Server
		send_num: 0,
		send: function(path, info, callback){
			// send with JSONP
			var script = document.createElement('script');
			script.async = true;
			var callback_name = 'exec'+gg.net.send_num;
			++gg.net.send_num;
			window[callback_name] = function(data) {
				console.log('Done: ' + callback_name);
				console.log('Data: ' + JSON.stringify(data));
				// delete this script
				var scr = document.getElementById(callback_name);
				scr.parentNode.removeChild(scr);
				// Call the callback
				callback(data);
				// Delete this function
				window[callback_name] = null;
				delete window[callback_name];
			}
			if(info)
				info += '&';
			script.src = 'https://victor-gg.appspot.com/api/' + path + '?' + info + 'callback=' + callback_name;
			script.id = callback_name;
			console.log('GET ' + script.src);
			console.log('Callback: ' + callback_name);
			document.getElementsByTagName('head')[0].appendChild(script);
		},
		// Server -> Client
		recv_timer: 0,
		recv_send_time: 0,
		is_receiving: false, // whether the client is receiving from the client
		receive: function(path, info, callback){
			// Pull every second
			if(gg.net.is_receiving)
				return; // do not start receiving if it is already started
			gg.net.is_receiving = true;
			gg.net.receive_do(path, info, callback);
		},
		receive_do: function(path, info, callback) {
			gg.net.recv_send_time = (new Date).getTime();
			gg.net.send(path, info, function(data) {
				// Pull again at the next second
				if(gg.net.is_receiving) {
					gg.net.recv_timer = setTimeout(function(){
						gg.net.recv_timer = 0;
						gg.net.receive_do(path, info, callback);
					}, Math.max(1, gg.net.recv_send_time + 1000 - (new Date).getTime()));
				}
				callback(data);
			});
		},
		receive_stop: function(){
			if(!gg.net.is_receiving)
				return;
			gg.net.is_receiving = false;
			// stop the next poll if it is in the middle of a request
			if(gg.net.recv_timer) {
				clearTimeout(gg.net.recv_timer);
				gg.net.recv_timer = 0;
			}
		}
	},
	nickname: {
		getName: function(){
			var nameEQ = "nick=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}
			return '';
		},
		saveName: function(){
			var nick = document.getElementById('search-input').value;
			document.getElementById('nickname').innerText = nick;
			document.cookie = "nick=" + escape(nick);
		}
	}
};
window.addEventListener('load', function(){
	document.getElementById('nickname').innerText = document.getElementById('search-input').value = gg.nickname.getName() || '(unnamed)';
}, false);
// String formatting tool
/*
String.prototype.format = function() {
	var args = arguments; // needed because the inside function has its own arguments
	return this.replace(/%(\d+)/g, function(match, number){
		if(typeof args[number] == 'undefined')
			return match; // don't change it
		return  args[number]; // make the replacement
	});
};
*/
// Shortcut for getElementById
function $(id){return document.getElementById(id); }
