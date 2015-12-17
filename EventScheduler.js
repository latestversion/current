
LG_ESCHED = "LG_EVNT_SCHED"

function EventScheduler()
{
	this.events = []
}

var _p = EventScheduler.prototype

_p.AddEvent = function(event)
{
	// O(n) ftw
	l1("AddEvent: Events in queue: {0}, new event with id {2} scheduled at {1}".format(this.events.length,event.Timestamp(),event.ID()),LG_ESCHED)
	var i
	for (i = this.events.length-1; i >= 0; i--)
	{
		if (event.Timestamp() >= this.events[i].Timestamp())
		{
			break
		}
	}

	var indextoput = i + 1
	l1("AddEvent: Putting new event at index: {0}".format(indextoput),LG_ESCHED)
	this.events.splice(indextoput,0,event)
	l1("AddEvent: Events in queue: " + this.events.length,LG_ESCHED)
}


_p.CancelEvent = function(eventid)
{
	l1("CancelEvent: cancel eventid " + eventid,LG_ESCHED)
	for(var i = this.events.length-1; i >= 0; i--)
	{
		if(this.events[i].ID() == eventid)
		{
			this.events.splice(i,1)
			l1("CancelEvent: Removed eventid {0} at idx {1}".format(eventid,i),LG_ESCHED)
			return
		}
	}
	l1("CancelEvent: Did not find eventid " + eventid,LG_ESCHED)
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

	var passedevents = this.events.splice(0,i)

	if(passedevents.length)
	{
		l1("GetPassedEvents: Passedevents:" + passedevents.length, LG_ESCHED)
		l1("GetPassedEvents: Events in queue: " + this.events.length, LG_ESCHED)
	}

	return passedevents
}


_p.GetFirstPassedEvent = function(currtime)
{

	var firstevent = this.events[0]

	if(firstevent && (firstevent.Timestamp() <= currtime))
	{
		this.events.shift()
		l1("GetFirstPassedEvent: Returning an event ")
		l1("GetFirstPassedEvent: Events in queue: " + this.events.length, LG_ESCHED)
		return firstevent
	}

	return false
}

Log.AddGroup(LG_ESCHED)

