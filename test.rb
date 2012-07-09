require_relative 'logger'
commands = [";Source", ";Echo", ";PM", ";Phrase"]
commands.pack("A")
while (line = gets.chomp)
	puts "Available Commands: #{commands}"
end