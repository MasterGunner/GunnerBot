var fs = require('fs');
var GunnerBot;
(function (GunnerBot) {
    var Utilities;
    (function (Utilities) {
        Utilities.logFile = "Unknown.log";
        function log(...message) {
            var line = (new Date()).toISOString() + ": " + message.join(" ");
            console.log(line);
            fs.appendFile(Utilities.logFile, line + "\n", function (err) { if (err)
                throw err; });
        }
        Utilities.log = log;
    })(Utilities = GunnerBot.Utilities || (GunnerBot.Utilities = {}));
})(GunnerBot || (GunnerBot = {}));
var GunnerBot;
(function (GunnerBot) {
    var Functions;
    (function (Functions) {
        var Modules;
        (function (Modules) {
            var DBStats;
            (function (DBStats_1) {
                function run(commandChar) {
                    irc.addListener('DBStats', new RegExp(" PRIVMSG (.*) :" + commandChar + "DBStats ?$", 'i'), function (info) {
                        DBStats(info);
                    });
                }
                DBStats_1.run = run;
                function DBStats(info) {
                    return;
                }
            })(DBStats = Modules.DBStats || (Modules.DBStats = {}));
        })(Modules = Functions.Modules || (Functions.Modules = {}));
    })(Functions = GunnerBot.Functions || (GunnerBot.Functions = {}));
})(GunnerBot || (GunnerBot = {}));
var GunnerBot;
(function (GunnerBot) {
    var Functions;
    (function (Functions) {
        var Modules;
        (function (Modules) {
            var Help;
            (function (Help) {
                function run(commandChar) {
                    irc.addListener('Functions', new RegExp(" PRIVMSG (.*) :" + commandChar + "(Functions|Modules|Commands) ?$", 'i'), function (info) {
                        var commands = irc.listeners.map(x => x[0]);
                        var hiddenCommands = ['PingPong', 'OnDisconnect'];
                        commands = commands.filter(function (x) { return hiddenCommands.indexOf(x) < 0; });
                        irc.say(info[1], 'Available Commands Are: ' + commands.join(', '));
                    });
                    irc.addListener('Help', new RegExp(" PRIVMSG (.*) :" + commandChar + "Help (.*)$", 'i'), function (info) {
                        var commands = irc.listeners.map(x => x[0].toLowerCase());
                        var command = irc.listeners[commands.indexOf(info[2].toLowerCase())];
                        if (command !== undefined) {
                            irc.say(info[1], command[3]);
                        }
                        else {
                            irc.say(info[1], "No help message found for provided command.");
                        }
                    }, "...");
                }
                Help.run = run;
            })(Help = Modules.Help || (Modules.Help = {}));
        })(Modules = Functions.Modules || (Functions.Modules = {}));
    })(Functions = GunnerBot.Functions || (GunnerBot.Functions = {}));
})(GunnerBot || (GunnerBot = {}));
var GunnerBot;
(function (GunnerBot) {
    var Functions;
    (function (Functions) {
        var Modules;
        (function (Modules) {
            var Responses;
            (function (Responses) {
                function run(commandChar) {
                    irc.addListener('Responses', new RegExp(":(.*)!.* PRIVMSG (.*) :([^\s]+) ?$", 'i'), function (info) {
                        switch (info[3].toLowerCase()) {
                            case "Marp":
                                Marp(info[2], info[1]);
                                break;
                        }
                    });
                }
                Responses.run = run;
                function Marp(channel, user) {
                    var result = Math.floor(Math.random() * 20) + 1;
                    switch (true) {
                        case (result == 1):
                            irc.say(channel, user + " HAS TINNITUS!");
                            break;
                        case (result < 10):
                            irc.say(channel, user + " /might/ have tinnitus.");
                            break;
                        default:
                            irc.say(channel, user + " does NOT have tinnitus.");
                    }
                }
            })(Responses = Modules.Responses || (Modules.Responses = {}));
        })(Modules = Functions.Modules || (Functions.Modules = {}));
    })(Functions = GunnerBot.Functions || (GunnerBot.Functions = {}));
})(GunnerBot || (GunnerBot = {}));
var GunnerBot;
(function (GunnerBot) {
    var Functions;
    (function (Functions) {
        var Modules;
        (function (Modules) {
            var Roll;
            (function (Roll_1) {
                function run(commandChar) {
                    irc.addListener('Roll', new RegExp(":(.*)!.* PRIVMSG (.*) :" + commandChar + "Roll (\\d+)d(\\d+)\\s*\\+?\\s*(\\d*)", 'i'), function (info) {
                        Roll(info);
                    }, "Roll some die. Usage: " + commandChar + "Roll xdy + z");
                }
                Roll_1.run = run;
                function Roll(info) {
                    GunnerBot.Utilities.log('Entered Roller');
                    var total = 0;
                    if (info[3] > 100 || info[4] > 100) {
                        total = (info[4] / 2 + 0.5) * info[3];
                    }
                    else {
                        for (var i = 0; i < info[3]; i++) {
                            total = total + Math.floor(Math.random() * info[4]) + 1;
                        }
                    }
                    if (info[5]) {
                        total = total + info[5];
                    }
                    irc.say(info[2], '' + info[1] + ' rolled: ' + total);
                }
            })(Roll = Modules.Roll || (Modules.Roll = {}));
        })(Modules = Functions.Modules || (Functions.Modules = {}));
    })(Functions = GunnerBot.Functions || (GunnerBot.Functions = {}));
})(GunnerBot || (GunnerBot = {}));
var GunnerBot;
(function (GunnerBot) {
    var Functions;
    (function (Functions) {
        var Modules;
        (function (Modules) {
            var Emojifi;
            (function (Emojifi_1) {
                var translate = require('moji-translate');
                function run(commandChar) {
                    irc.addListener('DBStats', new RegExp(" PRIVMSG (.*) :" + commandChar + "Emojif(?:i|y) (.*) ?$", 'i'), function (info) {
                        Emojifi(info);
                    });
                }
                Emojifi_1.run = run;
                function Emojifi(info) {
                    var emojifiedResponse = translate.translate(info[2], false);
                    irc.say(info[1], emojifiedResponse);
                }
            })(Emojifi = Modules.Emojifi || (Modules.Emojifi = {}));
        })(Modules = Functions.Modules || (Functions.Modules = {}));
    })(Functions = GunnerBot.Functions || (GunnerBot.Functions = {}));
})(GunnerBot || (GunnerBot = {}));
var GunnerBot;
(function (GunnerBot) {
    var Functions;
    (function (Functions) {
        var modules = GunnerBot.Functions.Modules;
        var commandChar = ';';
        function RegisterListeners() {
            irc.addListener('JoinChannel', new RegExp(" PRIVMSG (.*) :" + commandChar + "Join (.*)", 'i'), function (info) {
                irc.join(info[2]);
            }, "Make GunnerBot join a new channel. Usage: " + commandChar + "Join #Channel");
            irc.addListener('LeaveChannel', new RegExp(" PRIVMSG (.*) :" + commandChar + "Leave ?$", 'i'), function (info) {
                irc.leave(info[1]);
            }, "Make GunnerBot leave the channel. Usage: " + commandChar + "Leave");
            irc.addListener('Echo', new RegExp(" PRIVMSG (.*) :" + commandChar + "Echo (.*)", 'i'), function (info) {
                irc.say(info[1], info[2]);
            }, "Echo the provided text. Usage: " + commandChar + "Echo DerpDerpDerp");
            irc.addListener('Source', new RegExp(" PRIVMSG (.*) :" + commandChar + "Source ?$", 'i'), function (info) {
                irc.say(info[1], "Don't judge me! https://github.com/MasterGunner/GunnerBot.git");
            });
            modules.Help.run(commandChar);
            modules.Responses.run(commandChar);
            modules.Roll.run(commandChar);
            modules.Emojifi.run(commandChar);
        }
        Functions.RegisterListeners = RegisterListeners;
    })(Functions = GunnerBot.Functions || (GunnerBot.Functions = {}));
})(GunnerBot || (GunnerBot = {}));
var net = require('net');
var GunnerBot;
(function (GunnerBot) {
    var IRC;
    (function (IRC_1) {
        class IRC {
            constructor() {
                this.socket = new net.Socket();
                this.listeners = [];
                this.socket.setEncoding('ascii');
                this.socket.setNoDelay();
                this.startupConfig();
            }
            startupConfig() {
                this.addListener('PingPong', /^PING (.+)$/i, (info) => {
                    this.send('PONG ' + info[1]);
                });
                this.socket.on('data', (data) => {
                    data = data.split('\r\n');
                    data.forEach((message) => {
                        GunnerBot.Utilities.log('RECV -', message);
                        if (message !== '') {
                            this.handle(message);
                        }
                    });
                });
            }
            connect(server, port, channels, nick) {
                this.socket.on('connect', () => {
                    GunnerBot.Utilities.log('Established connection, registering and shit...');
                    setTimeout(() => {
                        this.send('NICK ' + nick);
                        this.send('USER ' + nick + ' 8 *:Node.js IRC bot');
                        if (channels) {
                            setTimeout(() => {
                                channels.forEach((channel) => {
                                    this.join(channel);
                                });
                            }, 3000);
                        }
                    }, 1000);
                    this.addListener('OnDisconnect', /^ERROR :Closing Link:/i, (info) => {
                        this.removeListener('OnDisconnect');
                        setTimeout(() => {
                            this.connect(server, port, channels, nick);
                        });
                    });
                });
                this.socket.connect(port, server);
            }
            join(channel) {
                this.send('JOIN ' + channel);
                GunnerBot.Utilities.log('JOINED CHANNEL -', channel);
            }
            leave(channel) {
                this.send('PART ' + channel);
                GunnerBot.Utilities.log('LEFT CHANNEL - ', channel);
            }
            addListener(name, query, callback, helpText) {
                this.listeners.push([name, query, callback, (helpText ? helpText : "")]);
            }
            removeListener(name) {
                for (var i = 0; i < this.listeners.length; i++) {
                    if (this.listeners[i][0] === name) {
                        this.listeners.splice(i, 1);
                        i--;
                    }
                }
            }
            handle(message) {
                for (var i = 0; i < this.listeners.length; i++) {
                    var info = this.listeners[i][1].exec(message);
                    if (info) {
                        this.listeners[i][2](info);
                    }
                }
            }
            send(message) {
                this.socket.write(message + '\r\n', 'ascii', () => {
                    GunnerBot.Utilities.log('SENT -', message);
                });
            }
            say(channel, message) {
                if (message.indexOf('ACTION ') == 0) {
                    message = String.fromCharCode(1) + message + String.fromCharCode(1);
                }
                this.socket.write('PRIVMSG ' + channel + ' :' + message + '\r\n', 'UTF8', () => {
                    GunnerBot.Utilities.log('SAID (' + channel + ') -', message);
                });
            }
        }
        IRC_1.IRC = IRC;
    })(IRC = GunnerBot.IRC || (GunnerBot.IRC = {}));
})(GunnerBot || (GunnerBot = {}));
var utilities = GunnerBot.Utilities;
var ircModule = GunnerBot.IRC;
var irc = new ircModule.IRC();
var args = process.argv.slice(2);
var server = args.shift();
var channels = args;
utilities.logFile = server + ".log";
GunnerBot.Functions.RegisterListeners();
irc.connect(server, 6667, channels, 'GunnerBot');
setTimeout(function () {
    args.forEach(function (val) {
        irc.join(val);
    });
}, 5000);
