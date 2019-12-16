(function nodeListForEach() {
    if (typeof NodeList.prototype.forEach === 'function') return;
    NodeList.prototype.forEach = Array.prototype.forEach;
}());
