evalFile("CtorRegistry")

CommandFactory = new CtorRegistry("CommandFactory")

var RegisterCommand = CommandFactory.Register.bind(CommandFactory)

