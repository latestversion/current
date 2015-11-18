function CutsceneProxy()
{
	this.Wait = ""
	this.Text = ""
	this.Line = ""
	this.Options = ""
	this.AnyKey = ""
	this.Goto = ""
	this.Done = ""
}

var _p = CutsceneProxy.prototype

_p.Wait = function(){throw "You forgot to override 'Wait'"}
_p.Text = function(){throw "You forgot to override 'Text'"}
_p.Line = function(){throw "You forgot to override 'Line'"}
_p.GiveOptions = function(){throw "You forgot to override 'GiveOptions'"}
_p.AnyKey = function(){throw "You forgot to override 'AnyKey'"}
_p.Goto = function(){throw "You forgot to override 'Goto'"}
_p.Done = function(){throw "You forgot to override 'Done'"}

_p.t = _p.Text
_p.l = _p.Line
_p.w = _p.Wait
_p.options = _p.GiveOptions
_p.go = _p.Goto
