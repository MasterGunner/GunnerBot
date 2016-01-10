//
// Basic IRC communication and functionality library.
//

/// <reference path="../typings/tsd.d.ts" />
/// <reference path="Utilities.ts" />

var net = require('net');

module GunnerBot {
	export module IRC {
		export class IRC {
			socket: any;	//communication socket
			listeners: Array<any>; //listeners for incoming messages.
			
			constructor() {
				//Instantiate class variables.
				this.socket = new net.Socket();
				this.listeners = [];
				
				//Set default values.
				this.socket.setEncoding('ascii');
				this.socket.setNoDelay();
				
				this.startupConfig();
			}
			
			//Initial IRC and Socket listeners.
			startupConfig(): void {
				//Register listener for Ping/Pong.
				this.addListener('PingPong',/^PING :(.+)$/i, (info) => {
					this.send('PONG :' + info[1]);
				});
				
				//Register listener for joining designated channel
				//this.addListener(/:MistressGunner!.* PRIVMSG (.*) :;Join (.*)/i, function(info) {
				this.addListener('JoinChannel', new RegExp(" PRIVMSG (.*) :"+commandChar+"Join (.*)",'i'), function(info) {
					irc.send('JOIN ' + info[2]);
				});
				
				//Gets incoming data, separates into lines, logs, and passes to data handler
				this.socket.on('data', (data) => {
					data = data.split('\r\n');
					data.forEach((message) => {
						Utilities.log('RECV -', message);
						if (message !== '') {
							this.handle(message);
						}
					});
				});
			}
			
			//Connect to an IRC server.
			connect(server: string, port: number, channel:string, nick:string): void {
				//Set socket listeners for connect and disconnect.
				this.socket.on('connect', () => {
					Utilities.log('Established connection, registering and shit...');
					
					//Wait for connection to be established, and then send connection details.
					setTimeout(() => {
						this.send('NICK ' + nick);
						this.send('USER ' + nick + ' 8 *:Node.js IRC bot');
						if(channel) { //If channel is specified, join it after 3 seconds.
							setTimeout(() => {
								this.join(channel);
							}, 3000);
						}
					}, 1000);
					
					//On disconnect...
				});
				
				//Connect to server
				this.socket.connect(port, server);
			}
			
			//Join an IRC Channel.
			join(channel:string): void {
				this.send('JOIN ' + channel);
				Utilities.log('JOINED CHANNEL -', channel);
			}
			
			//Add listeners for incoming messages.
			addListener(name: string, query: RegExp, callback: any): void {
				this.listeners.push([name, query, callback]);
			}
			
			//Remove listener for incoming messages.
			removeListener(name: string): void {
				for (var i = 0; i < this.listeners.length; i++) {
					if(this.listeners[i][0] === name) { //Find listener with matching name.
						this.listeners.splice(i, 1); //Remove listener from list.
						i--; //Decrease counter to avoid skipping the next listener.
					}
				}
			}
			
			handle(message: string): void {
				//var i: number, info: Object;
				for (var i = 0; i < this.listeners.length; i++) { //Iterate through all listeners.
					var info = this.listeners[i][1].exec(message); //Check if the message hits the regex for the listener.
					if (info) { //If it matches, call the function associated with the listener.
						this.listeners[i][2](info); //Pass into the listener function the results of the regex matching.
					}
				}
			}
			
			//Send raw information.
			send(message: string): void {
				this.socket.write(message + '\r\n', 'ascii', () => {
					Utilities.log('SENT -', message);
				});
			}
			
			//Say something to a channel
			say(channel: string, message: string): void {
				if (message.indexOf('ACTION ') == 0) {
					message = String.fromCharCode(1) + message + String.fromCharCode(1);
				}
				this.socket.write('PRIVMSG ' + channel + ' :' + message + '\r\n', 'ascii', () => {
					console.log('SAID (' + channel + ') -', message);
				});
			}
		}
	}	
}