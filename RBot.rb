require_relative 'logger'
require_relative 'irc'
require 'thread'

SERVER = "irc.desertbus.org"
PORT = 6667
NICK = "RubyGunner"
CHAN = "#desertbus"

@iBot = IRC.new(SERVER, PORT, NICK, CHAN)
def botRead
	Logger.log "In Thread"
	while (line = @iBot.gets)
		Logger.log "RECV - " + line
		if /^PING :(.+)$/i.match(line)
			@iBot.send ("PONG :" + $1)
		end
	end
end
def botWrite
	while (line = gets.chomp)
		if /^QUIT/.match(line)
			break
		end
		@iBot.say("#DesertBus", "#{line}")
	end
end
t1 = Thread.new{botRead}
botWrite
Thread.kill(t1)
@iBot.close
