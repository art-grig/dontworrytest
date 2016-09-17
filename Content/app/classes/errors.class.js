function Errors() {
}

Errors.prototype.setError = function (key, text) {
    if (text)
        this[key] = text;
    else
        delete this[key];
};

Errors.prototype.getMessages = function () {
    var result = [];
    for (key in this)
        if (this[key] && typeof(this[key]) != "function")
            result.push(this[key]);
    return result;
};

Errors.prototype.isValid = function () {
    for (key in this)
        if (this[key] && typeof (this[key]) != "function")
            return false;
    return true;
};