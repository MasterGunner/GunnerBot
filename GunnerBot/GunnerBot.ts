/// <reference path="../typings/tsd.d.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="irc.ts" />

var utilities = GunnerBot.Utilities
var ircModule = GunnerBot.IRC;

var irc =  new ircModule.IRC();

//Misc libraries and stuff used for listeners.
var MarkovChain = require('markovchain')
var fs = require('fs')
var DBRecords = new MarkovChain(fs.readFileSync('./DBRecords.txt'))

//Load commandline arguments - which servers/channels to connect to.
//Example node GunnerBot.js irc.desertbus.org #desertbus #unmoderated
var args = process.argv.slice(2); //Remove the 'node' and 'GunnerBot.js' arguments.
var server = args.shift(); //Get the server to connect to.
var channel = args.shift(); //Get the default channel to connect to.

//Echo whatever was said in the same channel the command was given on
irc.addListener('Echo', new RegExp(" PRIVMSG (.*) :"+commandChar+"Echo (.*)",'i'), function(info) {
	irc.say(info[1], info[2]);
});

irc.addListener('DBX', new RegExp(" PRIVMSG (.*) :"+commandChar+"DBX ?$",'i'), function(info) {
    var output = Math.floor(Math.random()*160) + ':' + ('0' + Math.floor(Math.random()*60)).slice(-2) + " - ";
    if (Math.floor(Math.random()*100) == 1) {
        output += "Johnny's shift ends, Johnny's shift begins."
    } else {
        output += DBRecords.start(function(wordList) { 
            var tmpList = Object.keys(wordList); 
            return tmpList[~~(Math.random()*tmpList.length)]; 
        }).end().process();
    }
    irc.say(info[1],output);
});

//irc.connect('irc.desertbus.org', 6667, '#desertbus', 'GunnerBot');
irc.connect(server, 6667, channel, 'GunnerBot');

setTimeout(function() {
	//irc.join('#help');
    args.forEach(function(val) {
        irc.join(val); 
    });
},5000);