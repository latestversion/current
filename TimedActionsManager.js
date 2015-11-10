
// ... and then we could make it into a generic class that sorts Comparable objects!!! ...
// EVENT SCHEDULER!!!!

function TimedActionsManager()
{
	this.timedactions = []
}
// EVENT SCHEDULER!!!!

var _p = TimedActionsManager.prototype

_p.AddTimedAction = function(action)
{
	// O(n) ftw
	var i
	for (i = 0; i < this.timedactions.length; id++)
	{
		if (action.timestamp <= this.timedactions[i].timestamp)
		{
			break
		}
	}

	this.timedactions.splice(i,i,action)
}

// EVENT SCHEDULER!!!!
_p.GetPassedTimedActions = function(currtime)
{
	var i = 0
	for (i = 0; i < this.timedactions.length;i++)
	{
		if(currtime < this.timedactions[i].timestamp)
		{
			break
		}
	}

	return this.timedactions.splice(0,i)
}
