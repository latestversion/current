//: Playground - noun: a place where people can play

import UIKit
import JavaScriptCore



let ctx = JSContext()

let platform = Platform()

ctx.exceptionHandler  = { context, exception in
    print("JS Error: \(exception)")
}


ctx.setObject(platform, forKeyedSubscript: "platform")
ctx.evaluateScript("readFile = platform.readFile.bind(platform)")
ctx.evaluateScript("writeFile = platform.writeFile.bind(platform)")
ctx.evaluateScript("console = platform")


var a = ctx.evaluateScript("this.platform.getFileContent('hej')")
print(a)

// 1. Just eval main from context
ctx.evaluateScript("var s = readFile('main.js');eval(s)")

// ... or, 2. eval it from here
func evalFile(suffixfreename:String,context:JSContext)
{
    // get path to the pagedown source file
    let path = NSBundle.mainBundle().pathForResource(suffixfreename, ofType: "js")
    
    // get the contentData for the file
    let contentData = NSFileManager.defaultManager().contentsAtPath(path!)
    
    // get the string from the data
    let content = NSString(data: contentData!, encoding: NSUTF8StringEncoding) as? String
    
    // finally inject it into the js context
    context.evaluateScript(content)
    
}

evalFile("main", context: ctx)





