function TelnetHandler(connection)
{
	this.connection = connection
	this.onData = this.onData.bind(this)
	this.connection.on("data",this.onData)
	this.buffer = ""
	this.cid = TelnetHandler.cid++
	this.lines = []
}

TelnetHandler.cid = 0

var _p = TelnetHandler.prototype

_p.onData = function(d)
{
	var s = d.toString("ascii")
	this.parse(s)
}

_p.parse = function(s)
{
	l1("data: " + s.charCodeAt(0) + " " + s.charCodeAt(1))
	//console.log("TelnetHandler " + this.cid + " got data: " + s)
	// RFC 1123 3.3.1. states clients should send either \r\0 or \r\n.
	// (The mac default telnet seems to send 13 10)
	s = s.replace("\r\0","\n")
	s = s.replace("\r\n","\n")
	// Let's safeguard against an odd \r, too.
	s = s.replace("\r","\n")

	if("\n" == s && 0 == this.buffer.length)
	{
		this.lines.push(s)
		return
	}

	this.buffer += s

	var nidx = this.buffer.indexOf("\n")
	while (nidx >= 0)
	{
		var line = this.buffer.substring(0,nidx)
		var remaining = this.buffer.substring(nidx+1)
		this.buffer = remaining
		if(line)
		{
			// replace accidental double spaces etc (should be moved upwards in the layers)
			//line = line.replace(/\s+/g," ")
			// trim ws from right and left
			//line = line.trim()
			this.lines.push(line)
		}
		nidx = this.buffer.indexOf("\n")
	}

}

_p.put = function(line)
{
	if(this.connection)
	{
		this.connection.write(line)
	}
}

_p.putn = function(line)
{
	if(!line)
	{
		line = ""
	}

	this.put(line + "\n")

}

_p.get = function()
{
	return this.lines.shift()
}

