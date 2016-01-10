/// <reference path="../typings/tsd.d.ts" />
declare var commandChar: string;
declare module GunnerBot {
    module Utilities {
        function log(...message: any[]): void;
    }
}
declare var net: any;
declare module GunnerBot {
    module IRC {
        class IRC {
            socket: any;
            listeners: Array<any>;
            constructor();
            startupConfig(): void;
            connect(server: string, port: number, channel: string, nick: string): void;
            join(channel: string): void;
            addListener(name: string, query: RegExp, callback: any): void;
            removeListener(name: string): void;
            handle(message: string): void;
            send(message: string): void;
            say(channel: string, message: string): void;
        }
    }
}
declare var utilities: typeof GunnerBot.Utilities;
declare var ircModule: typeof GunnerBot.IRC;
declare var irc: GunnerBot.IRC.IRC;
declare var MarkovChain: any;
declare var fs: any;
declare var DBRecords: any;
declare var args: string[];
declare var server: string;
declare var channel: string;
