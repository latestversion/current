
console.log("Entering main.js")

var evalString = readFile("EvalFile.js")

console.log(evalString.length)

eval(evalString)

evalFile("A.js")
evalFile("Scene.js")

var a = new A()

console.log(a.Message())

console.log("Exiting main.js")