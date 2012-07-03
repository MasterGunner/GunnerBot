//
// Gbot
//

var net = require('net');
var fs = require('fs');
var irc = {};
var bot = {};

irc.socket = new net.Socket();

bot.gList = []; //Generic list of phrases
bot.cList = []; //Complements list
bot.iList = []; //Insults list
bot.nick = 'GunnerBot';
bot.chan = '#desertbus';

//Load phrase list
setTimeout(function() {
	bot.loadList();
}, 1000);

//Gets incoming data, separates into lines, logs, and passes to data handler
irc.socket.on('data', function(data) {
	data = data.split('\r\n');
	for (var i = 0; i < data.length; i++) {
		console.log('RECV -', data[i]);
		if (data !== '') {
			irc.handle(data[i]);
		}
	}
});

//create Listeners
setTimeout(function() {
	//Ping/Pong call-response
	irc.on(/^PING :(.+)$/i, function(info) {
		irc.send('PONG :' + info[1]);
	});
	//Response to name being called
	/*irc.on(/ PRIVMSG (.*) :.*GunnerBot/i, function(info) {
		if (Math.floor(Math.random()*3) > 0) { irc.say(info[1], bot.getInsult()); }
		else { irc.say(info[1], bot.getComplement()); }
	});*/
	//List available commands
	irc.on(/ PRIVMSG (.*) :!Functions/i, function(info) {
		irc.say(info[1], "Available Commands: !Echo, !PM, !Phrase");
	});
	//Echo whatever was said in the same channel the command was given on
	irc.on(/ PRIVMSG (.*) :!Echo (.*)/i, function(info) {
		irc.say(info[1], info[2]);
	});
	//Send message to designated channel
	irc.on(/ PRIVMSG .* :!PM (.*) (.*)/i, function(info) {
		irc.say(info[1], info[2]);
	});
	//Say a random phrase
	irc.on(/ PRIVMSG (.*) :!Phrase ?(.*)/i, function(info) {
		if (info[2]) { info[1] = info[2] } //if channel is given, set it as the response channel
		bot.sayPhrase(info[1]);
	});
	//Dice Roller
	irc.on(/:(.*)!.* PRIVMSG (.*) :;Roll (\d+)d(\d+) ?\+? ?(\d*)/i, function(info) {
		console.log('Entered Roller');
		var total = 0;
		for (var i = 0; i < info[3]; i++) {
			total = total + Math.floor(Math.random() * info[4]) + 1;
		}
		if(info[5]) {
			total = total + (info[5]*info[3]);
		}
		irc.say(info[2], '' + info[1] + ' rolled: ' + total);
	});
	//Reload phrase list
	irc.on(/:MistressGunner!.* PRIVMSG (.*) :!Reload/i, function(info) {
		bot.loadList();
	});
	//Join designated channel
	irc.on(/:MistressGunner!.* PRIVMSG (.*) :!Join (.*)/i, function(info) {
		irc.send('JOIN ' + info[2]);
	});
	//Leave channel
	irc.on(/:MistressGunner!.* PRIVMSG (.*) :!Part/i, function(info) {
		irc.send('PART ' + info[1]);
	});
}, 500);


irc.socket.on('connect', function() {
    console.log('Established connection, registering and shit...');
    setTimeout(function() {
		irc.send('NICK ' + bot.nick);
        irc.send('USER ' + bot.nick + ' 8 *:Node.js IRC bot');
		setTimeout(function() {
			irc.send('JOIN ' + bot.chan);
			}, 3000);
    }, 1000);
});

irc.socket.setEncoding('ascii');
irc.socket.setNoDelay();
irc.socket.connect(6667, 'irc.desertbus.org');

//Say phrases
//1/20 chance every 3 minutes
/*setInterval(function() {
	if(Math.floor(Math.random()*19) == 0) {
		bot.sayPhrase(bot.chan);
	}
}, 180000);*/

//handles incoming messages
irc.handle = function(data) {
	var i, info;
	for (i = 0; i < irc.listeners.length; i++) {
		info = irc.listeners[i][0].exec(data);
		if (info) {
			irc.listeners[i][1](info, data);
			if (irc.listeners[i][2]) {				
				irc.listeners.splice(i, 1);
			}
		}
	}
}

irc.listeners = [];
//Add listener to array
irc.on = function(data, callback) {
	irc.listeners.push([data, callback, false])
}
//send raw information
irc.send = function(data) {
	irc.socket.write(data + '\r\n', 'ascii', function() {
		console.log('SENT -', data);
	});
}
//Say something to a channel
irc.say = function(channel, data) {
	if (data.indexOf('ACTION ') == 0) {
		data = String.fromCharCode(1) + data + String.fromCharCode(1);
	}
	irc.socket.write('PRIVMSG ' + channel + ' :' + data + '\r\n', 'ascii', function() {
		console.log('SAID (' + channel + ') -', data);
	});
}

//Load/Reload phrase list
bot.loadList = function() {
	var file = fs.readFileSync('botlist.txt', 'ascii').split('\n');
	var i = 1;
	while (file[i] != "+++Complements:\r" && i < file.length) {
		bot.gList[i-1] = file[i];
		i++;
	}
	i++;
	var j = i;
	while (file[i] != "+++Insults:\r" && i < file.length) {
		bot.cList[i-j] = file[i];
		i++;
	}
	i++;
	j = i;
	while (i < file.length) {
		bot.iList[i-j] = file[i];
		i++;
	}
}

//Say a phrase
bot.sayPhrase = function(channel) {
		irc.say(channel, bot.gList[Math.floor(Math.random()*(bot.gList.length-1))]);
}

//Return an insult
bot.getInsult = function() {
	return bot.iList[Math.floor(Math.random()*(bot.iList.length-1))];
}

//return a complement
bot.getComplement = function() {
	return bot.cList[Math.floor(Math.random()*(bot.cList.length-1))];
}

