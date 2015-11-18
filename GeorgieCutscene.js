evalFile("CharacterFactory.js",this)
evalFile("Scene.js")
evalFile("Debug.js")
evalFile("Cutscene.js")

var georgienodes = {
// Send in a  goddamn delegate to the functions so I won't have to type like a madman
// also no need to bind...
      start:function(o){
          
          var s = "\n\n***Georgie cutscene***\n\nG is ready to speak."
          o.Line(s)
          o.Wait(1000)
          o.Line("The best!")
          o.Goto("ask")
        },
      ask:function(o){
          o.GiveOptions("How about if you got me 10 carrots?",[
            new OptionInfo("1","Carrots it is!","accept_quest"),
            new OptionInfo("2","I think not...","deny_quest"),
            new OptionInfo("3","Hmm, maybe","ambivalent_quest")])
        },
      accept_quest:function(o){
        o.Line()
        o.Line("Georgie puts some leaves in his pipe and smokes them.")
        o.Line("'Good!' he wheezes between his teeth before he succumbs to a nasty coughing fit.\n")
        o.Line("'Then it's... cough!cough! ...settled.'")
        o.AnyKey("exit")
      },
      deny_quest:function(o){
        o.Line("'That makes me sad...'")
        o.AnyKey("exit")
      },
      ambivalent_quest:function(o){
        o.Line("'Make up your mind you mongrel from the gutter!'")
        o.AnyKey("exit")
      },
      exit:function(o){
        o.Line("*")
        o.Done()
      }
}


function GeorgieScene(scenehandler,stream)
{
	Cutscene.call(this,scenehandler,stream,georgienodes)
}

CopyPrototype(Cutscene,GeorgieScene)

