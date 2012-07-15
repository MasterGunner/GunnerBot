#!/usr/bin/env ruby
=begin
	Functions and listeners for an IRC bot.
=end
require_relative 'logger'
class Functions
	@@commands = [";Source", ";Echo", ";PM", ";Roll", ";RollEach"]
	def Functions.listeners (iBot, line)
		begin
			#Ping/Pong response
			if /^PING :(.+)$/.match(line)
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
			elsif /:(.*)!.* PRIVMSG (.*) :;Roll(Each)? (\d+)d(\d+) ?\+? ?(\d*)/i.match(line)
				if (Integer($4) > 0 && Integer($4) < 1001 && Integer($5) > 0 && Integer($5) < 1001)
					Logger.log "RECV - " + line
					total = 0
					rolls = []
					Integer($4).times do
						total = total + dieRoll($5, $6)
						rolls << dieRoll($5, $6)
					end
					if $3.nil?
						iBot.say($2, "#{$1} rolled: #{total}")
					else
						iBot.say($2, "#{$1} rolled: #{rolls}")
					end
				else
					iBot.say($2, "#{1.chr}ACTION Slaps #{$1}#{1.chr}")
				end
			
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
	
	def dieRoll(sides, mod)
		total = Random.new.rand(1..Integer(sides))
		if(!mod.empty?)
			total = total + Integer(mod)
		end
		return total
	end
end