require_relative 'testclass'

while (line = ":MG!MG PRIVMSG #test :" + gets.chomp)
	Testclass.listeners(line)
end