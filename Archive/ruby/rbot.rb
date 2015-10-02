#!/usr/bin/env ruby
=begin
	IRC bot
=end
require_relative 'logger'
require_relative 'irc'
require_relative 'functions'
require 'thread'

#Connection variables
SERVER = "irc.desertbus.org"
PORT = 6667
NICK = "RubyGunner"
CHAN = "#desertbus"

#Read from IRC Connection socket
def botRead
	Logger.log("In Thread")
	while (line = @iBot.gets)
		if / :.*Gunner/i.match(line) || /(^| )MG($| )/i.match(line)
			Logger.log "RECV - " + line
		end
		Thread.new{Functions.listeners(@iBot, line)}
	end
end
#Write to IRC Socket
def botWrite
	@chan = "#DesertBus"
	while (line = gets.chomp)
		if /^QUIT/.match(line)
			break
		elsif /^CHAN (.+)/.match(line)
			@chan = $1
		elsif /^ACTION (.+)/.match(line)
			@iBot.say("#{@chan}", "#{1.chr}ACTION #{$1}#{1.chr}")
		else
			@iBot.say("#{@chan}", "#{line}")
		end
	end
end

#Load lists from files
Functions.readList

#Connect to IRC
@iBot = IRC.new(SERVER, PORT, NICK, CHAN)

#Create instance of Read method in new Thread
t1 = Thread.new{botRead}

#Create instance of Write method in main Thread
#Has access to terminal
botWrite

#Kill Read thread on exit
Thread.kill(t1)

#Close IRC connection
@iBot.close
