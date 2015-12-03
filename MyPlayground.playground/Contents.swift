//: Playground - noun: a place where people can play

import UIKit
import JavaScriptCore


let ctx = JSContext()


let a = ctx.evaluateScript("7")

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

ctx.exceptionHandler  = { context, exception in
    print("JS Error: \(exception)")
}

ctx.evaluateScript("var roggo = new HasArray('bones');for(var k in roggo){})



