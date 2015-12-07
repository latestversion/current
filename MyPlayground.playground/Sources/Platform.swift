import Foundation
import JavaScriptCore

@objc
protocol JSPlatform : JSExport {
    func wait(duration: Double)
    func getFileContent(filename:String)->String
}

@objc
public class Platform : NSObject, JSPlatform
{
    func wait(duration:Double) {
        
    }
    
    public
    func getFileContent(filename: String) -> String {
        return "FILE CONTENT"
    }
}