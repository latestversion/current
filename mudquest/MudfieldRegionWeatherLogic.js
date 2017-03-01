evalFile("Entity.js")
evalFile("LogicFactory.js")
evalFile("ItemFactory.js")
evalFile("RNG.js")

var MudFieldRegionWeather =
{
  StateClearSkies: 0,
  StateGreySkies: 1,
  StateDefault: 1,
  StateLightRain: 2,
  StateHeavyRain: 3,

  WeatherReturnType: function(text,state)
  {
    this.text = text
    this.state = state
  },

  // A class based approach would have been nice, but serializing it would have been a bit meh.

  DoGreySkies: function()
  {
    if(RNG.D100(50))
    {
      var msgs = ["Grey clouds gather in the skies.","The clouds turn slightly more grey.","Clouds cover the sky in the most depressing way."]
      return new MudFieldRegionWeather.WeatherReturnType(msgs[RNG.RandomInt(msgs.length-1)], this.StateGreySkies)
    }
    else
    {
      // Clear skies, light rain or heavy rain
      switch (RNG.RandomInt(2))
      {
        case 0:
          // Clear skies
          var text = "A part of the sky clears and a small patch of blue can be seen in the dark heavens."
          return new MudFieldRegionWeather.WeatherReturnType(text,this.StateClearSkies)
        break
        case 1:
          // Clear skies
          var text = "A light rain begins to fall."
          return new MudFieldRegionWeather.WeatherReturnType(text,this.StateLightRain)
        break
        case 2:
        // Clear skies
          var text = "Big drops of rain start smattering down."
          return new MudFieldRegionWeather.WeatherReturnType(text,this.StateHeavyRain)
        break
        default:
      }
    }
  },

  DoClearSkies: function()
  {
    if(RNG.D100(30))
    {
      var msgs = ["A bleak sun can be seen in the small circle of blue sky."]
      return new MudFieldRegionWeather.WeatherReturnType(msgs[RNG.RandomInt(msgs.length-1)], this.StateClearSkies)
    }
    else
    {
      var text = "The clouds drift together and cover the sky again."
      return new MudFieldRegionWeather.WeatherReturnType(text,this.StateGreySkies)
    }
  },

  DoLightRain: function()
  {
    if(RNG.D100(50))
    {
      var msgs = ["It's raining."]
      return new MudFieldRegionWeather.WeatherReturnType(msgs[RNG.RandomInt(msgs.length-1)],this.StateLightRain)
    }
    else
    {
      var text = "The rain subsides."
      return new MudFieldRegionWeather.WeatherReturnType(text,this.StateGreySkies)
    }
  },

  DoHeavyRain: function()
  {
    if(RNG.D100(50))
    {
      var msgs = ["Squish squish go your feet in the wet mud.","It's pouring down.","More and more rain keeps falling.","It rains. A lot."]
      return new MudFieldRegionWeather.WeatherReturnType(msgs[RNG.RandomInt(msgs.length-1)],this.StateHeavyRain)
    }
    else
    {
      var text = "Finally the heavy rains stop."
      return new MudFieldRegionWeather.WeatherReturnType(text,this.StateGreySkies)
    }
  },

  DoState: function(state)
  {
    switch (state)
    {
      case this.StateGreySkies:
        return this.DoGreySkies()
      break
      case this.StateClearSkies:
        return this.DoClearSkies()
      break
      case this.StateLightRain:
        return this.DoLightRain()
      break
      case this.StateHeavyRain:
        return this.DoHeavyRain()
      break
      default:
        return {text:"The weather is quite default.",state:this.StateDefault}
    }
  }
}


function MudfieldRegionWeatherLogic(regionid)
{
  Logic.call(this,regionid)
  this.SetName("mudfieldregionweatherlogic")
  this.SetDescription("Holds a state machine for weather.")
  this.spawntime = 30000
  this.weatherstate = MudFieldRegionWeather.StateDefault
}

CopyPrototype(Logic,MudfieldRegionWeatherLogic)

var _p = MudfieldRegionWeatherLogic.prototype

_p.DoAction = function(a)
{
  if(a.name == "worlddidstartaction")
  {
    l1(this.Name() + " got world start event")
    this.ScheduleAction()
  }

  if(a.name == "messagelogic" && this.Name() == a.text)
  {
    l1(this.Name() + " got a MESSAGELOGIC action! Hooray!")



    var region = Game.Region(this.OwnerID())
    var weatherinfo = MudFieldRegionWeather.DoState(this.weatherstate)
    this.weatherstate = weatherinfo.state
    Game.DoActionForChartersInRegion({name:"info",text:weatherinfo.text},region)
    this.ScheduleAction()
  }

  return true
}

_p.ScheduleAction = function()
{
  Game.AddAction({ name : "messagelogic",
    arg1 : TypeEnums.Region,
    arg2 : this.OwnerID(),
    text : this.Name()
  },
  this.spawntime + RNG.RandomInt(5)*1000)
}

RegisterLogic(MudfieldRegionWeatherLogic)
