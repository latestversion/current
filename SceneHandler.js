var SceneManager = function()
{
	this._scenes = [];
	this.pushScene = function(Scene)
	{
		this._scenes.push(Scene);
	}
	this.popScene = function()
	{
		return this._scenes.pop();
	}
	this.clearScenes = function()
	{
		this._scenes = [];
	}
	this.getCurrentScene  = function()
	{
		var numScenes = this._scenes.length;
		if(numScenes)
		{
			return this._scenes[numScenes-1];
		}

		return null;
	}

	this.setCurrentScene = function(scene)
	{
		this.popScene()
		this.pushScene(scene)
	}
}
