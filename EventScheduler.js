
LG_ESCHED = "LG_EVNT_SCHED"

function EventScheduler()
{
	this.events = []
}

var _p = EventScheduler.prototype

_p.AddEvent = function(event)
{
	// O(n) ftw
	l1("AddEvent: Events in queue: {0}, new event scheduled at {1}".format(this.events.length,event.Timestamp()),LG_ESCHED)
	var i
	for (i = 0; i < this.events.length; i++)
	{
		if (event.Timestamp() <= this.events[i].Timestamp())
		{
			break
		}
	}

	l1("AddEvent: Putting new event at index: {0}".format(i),LG_ESCHED)
	this.events.splice(i,i,event)
	l1("AddEvent: Events in queue: " + this.events.length,LG_ESCHED)
}

_p.GetPassedEvents = function(currtime)
{
	var i = 0
	for (i = 0; i < this.events.length;i++)
	{
		if(currtime < this.events[i].Timestamp())
		{
			break
		}
	}

	return this.events.splice(0,i)
}
