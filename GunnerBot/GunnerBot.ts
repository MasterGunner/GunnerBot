/// <reference path="../typings/tsd.d.ts" />
/// <reference path="utilities.ts" />
/// <reference path="functions.ts" />
/// <reference path="irc.ts" />

var utilities = GunnerBot.Utilities
var ircModule = GunnerBot.IRC;

var irc =  new ircModule.IRC();

//Load commandline arguments - which servers/channels to connect to.
var args = process.argv.slice(2); //Remove the 'node' and 'GunnerBot.js' arguments.
var server = args.shift(); //Get the server to connect to.
var channels = args; //Get the default channel to connect to.

utilities.logFile = server + ".log";

GunnerBot.Functions.RegisterListeners();

//irc.connect('irc.dbcommunity.org', 6667, ['#desertbus'], 'GunnerBot');
irc.connect(server, 6667, channels, 'GunnerBot');

setTimeout(function() {
	//irc.join('#help');
    args.forEach(function(val) {
        irc.join(val); 
    });
},5000);

//node GunnerBot.js irc.dbcommunity.org #desertbus #butts