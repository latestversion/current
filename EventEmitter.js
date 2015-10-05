
function EventEmitter() {
    this._listeners = {}
}

_p = EventEmitter.prototype

_p.addListener = _p.on = function(type, listener) {
    if (typeof listener !== "function")
        throw "Listener must be a function";

    if (!this._listeners[type]) {
        this._listeners[type] = []
    }

    console.log("registered listener event " + type)
    this._listeners[type].push(listener);
}

_p.removeListener = function(type, listener) {
    if (typeof listener !== "function")
        throw "Listener must be a function";

    if (!this._listeners[type])
        return;

    var position = this._listeners[type].indexOf(listener)

    if (position != -1)
        this._listeners[type].splice(position, 1)
}


_p.removeAllListeners = function(type) {
    if (type) {
        this._listeners[type] = []
    } else {
        this._listeners = {};
    }
}

_p.emit = function(type, event) {
    console.log("emitting " + type)
    if (!(this._listeners[type] && this._listeners[type].length)) {
        return;
    }

    for (var i = 0; i < this._listeners[type].length; i++) {
        this._listeners[type][i].call(this, event);
    }
}