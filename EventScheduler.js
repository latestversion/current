
function EventScheduler()
{
	this.events = []
}

var _p = EventScheduler.prototype

_p.AddEvent = function(action)
{
	// O(n) ftw
	var i
	for (i = 0; i < this.events.length; id++)
	{
		if (action.timestamp <= this.events[i].timestamp)
		{
			break
		}
	}

	this.events.splice(i,i,action)
}

_p.GetPassedEvents = function(currtime)
{
	var i = 0
	for (i = 0; i < this.events.length;i++)
	{
		if(currtime < this.events[i].timestamp)
		{
			break
		}
	}

	return this.events.splice(0,i)
}
