import Foundation
import JavaScriptCore


@objc
protocol JSPlatform : JSExport {
    func wait(duration: Double)
    func getFileContent(filename:String)->String
    func readFile(filename:String)->String
    func writeFile(filename:String)
    func busyWait(delay:Int)
    func log(text:String)
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
    
    func readFile(fullfilename:String)->String{
        
        // get path to the pagedown source file
        let path = NSBundle.mainBundle().pathForResource(fullfilename, ofType: "")
        
        // get the contentData for the file
        let contentData = NSFileManager.defaultManager().contentsAtPath(path!)
        
        // get the string from the data
        let content = NSString(data: contentData!, encoding: NSUTF8StringEncoding) as? String
        
        return content!
    }
    
    func writeFile(filename: String) {
        
    }
    
    func busyWait(delay:Int)
    {
    }
    
    func log(text: String) {
        print(text)
    }
}


