/// <reference path="../typings/tsd.d.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="irc.ts" />

var utilities = GunnerBot.Utilities
var ircModule = GunnerBot.IRC;

var irc =  new ircModule.IRC();

//Echo whatever was said in the same channel the command was given on
irc.addListener(/ PRIVMSG (.*) :;Echo (.*)/i, function(info) {
	irc.say(info[1], info[2]);
},false);

irc.connect('irc.desertbus.org', 6667, '#desertbus', 'GunnerBot');

setTimeout(function() {
	irc.join('#help');
},5000);