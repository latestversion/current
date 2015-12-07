//: Playground - noun: a place where people can play

import UIKit
import JavaScriptCore



let ctx = JSContext()

let platform = Platform()


ctx.setObject(platform, forKeyedSubscript: "platform")

ctx.exceptionHandler  = { context, exception in
    print("JS Error: \(exception)")
}

var a = ctx.evaluateScript("this.platform.getFileContent('hej')")
print(a)

print("Muu")

 a = ctx.evaluateScript("7;eval('hejsan=6677;function hepp(){}')")

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


evalFile("CopyPrototype",context:ctx)
evalFile("HasArray",context:ctx)



ctx.evaluateScript("var roggo = new HasArray('bones');")

print("\(ctx.objectForKeyedSubscript("roggo"))")
ctx.evaluateScript("JSON.stringify(roggo)")


