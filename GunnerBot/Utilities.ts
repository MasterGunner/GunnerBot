/// <reference path="../typings/tsd.d.ts" />
var fs = require('fs');
module GunnerBot {
	export module Utilities {
        export var logFile = "Unknown.log";
		//Logging
		export function log (...message: any[]): void {
            var line = (new Date()).toISOString() + ": " + message.join(" ");
			console.log(line);
            
			fs.appendFile(logFile, line+"\n", function(err) { if (err) throw err; }); 
		}
	}
}