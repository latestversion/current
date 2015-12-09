evalFile("CtorRegistry")

LogicFactory = new CtorRegistry("LogicFactory")

RegisterLogic = LogicFactory.Register.bind(LogicFactory)

//Log.logGroups.push(loggroup)
