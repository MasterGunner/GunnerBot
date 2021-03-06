#!/usr/bin/env ruby
=begin
	This class extends the TCP socket, allowing one to connect to an IRC server, 
	and send properly formatted commands to it.
=end
require 'socket'

class IRC < TCPSocket
	alias :super_send :send
	def initialize (server, port, nick, chan)
		super(server, port)
		sleep(1)
		Logger.log "Connecting..."
		send "NICK #{nick}"
		send "USER #{nick} 8 *:Node.js IRC bot"
		sleep(3)
		send "JOIN #{chan}"
	end
	def send (message)
		super "#{message}\r\n", 0
		unless /^PONG/.match(message)
			Logger.log "SENT - #{message}"
		end
	end
	def say (channel, message)
		super_send "PRIVMSG #{channel} :#{message}\r\n", 0
		Logger.log "SENT(#{channel}) - #{message}"
	end
end