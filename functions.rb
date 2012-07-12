#!/usr/bin/env ruby
=begin
	Functions and listeners for an IRC bot.
=end
require_relative 'logger'
class Functions
	@@commands = [";Source", ";Echo", ";PM", ";Roll"]
	def Functions.listeners (iBot, line)
		begin
			#Ping/Pong response
			if /^PING :(.+)$/i.match(line)
				iBot.send ("PONG :" + $1)
			
			#####Public Commands#####
			
			#List available commands
			elsif / PRIVMSG (.*) :;Help/i.match(line)
				Logger.log "RECV - " + line
				iBot.say($1, "Available Commands: #{@@commands}")
			#Link to bot source code
			elsif / PRIVMSG (.*) :;Source/i.match(line)
				Logger.log "RECV - " + line
				iBot.say($1, "https://github.com/MasterGunner/GunnerBot")
			#Echo message back into channel
			elsif / PRIVMSG .* :;PM (.*) (.*)/i.match(line)
				Logger.log "RECV - " + line
				iBot.say($1, "#{$2}")
			#Send message to designated channel
			elsif / PRIVMSG (.*) :;Echo (.*)/i.match(line)
				Logger.log "RECV - " + line
				iBot.say($1, "#{$2}")
			#Dice Roller
			elsif /:(.*)!.* PRIVMSG (.*) :;Roll (\d+)d(\d+) ?\+? ?(\d*)/i.match(line)
					Logger.log "RECV - " + line
					total = 0
					for i in 1..Integer($3)
						total = total + Random.new.rand(1..Integer($4))
					end
					if(!$5.empty?)
						total = total + (Integer($5)*Integer($3))
					end
					iBot.say($2, "#{$1} rolled: #{total}")
			
			#####Administrative Commands#####
			
			#Join designated channel
			elsif /:MistressGunner!.* PRIVMSG .* :;Join (.*)/i.match(line)
				Logger.log "RECV - " + line
				iBot.send("JOIN #{$1}")
			#Leave channel
			elsif /:MistressGunner!.* PRIVMSG (.*) :;Part/i.match(line)
				Logger.log "RECV - " + line
				iBot.send("PART #{$1}")
			end
		rescue Exception => e
		Logger.log e.message
		Logger.log e.backtrace.inspect
		end
	end
end