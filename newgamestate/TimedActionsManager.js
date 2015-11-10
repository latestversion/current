function TimedActionsManager()
{
	this.timedactions = []
}



var _p = TimedActionsManager.prototype

_p.AddTimedAction(time,action)
{
	// O(n) ftw
	if(0 == this.timedactions.length)
	{
		this.timedactions.push(new Boff(time,action))
		return
	}

	var idx
	for (idx = 0; idx < this.timedactions.length; id++)
	{
		if (time <= this.timedactions[idx])
		{
			break
		}
	}



}

function Boff(time,object)
{
	this.time = time
	this.object = object
}




