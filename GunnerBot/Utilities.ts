/// <reference path="../typings/tsd.d.ts" />
module GunnerBot {
	export module Utilities {
		//Logging
		export function log (...message: any[]): void {
			console.log(message.join(" "));
		}
	}
}