var ColorBank = {}

var _colorDict = {

    greyscale:[
    "rgb(160,160,10)",
    "rgb(158,158,158)",
    "rgb(184,184,184)",
    "rgb(173,173,173)",
    "rgb(205,205,205)",
    "rgb(217,217,217)",
    "rgb(202,202,202)",
    "rgb(225,225,255)",
    "rgb(226,226,226)",
    "rgb(231,231,231)",
    "rgb(235,235,235)",
    "rgb(240,240,240)",
    "rgb(238,238,238)",
    "rgb(230,100,100)"
    ]

}

ColorBank.getRandom = function(mainColor)
{
    return _colorDict["greyscale"].getRandomElement();
}