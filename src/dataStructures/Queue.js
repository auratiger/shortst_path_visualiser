export default function Queue() {
    this.elements = [];
 }

Queue.prototype.enqueue = function (e) {
    this.elements.push(e);
};

Queue.prototype.toFront = function (e) {
    this.elements.unshift(e);
}

Queue.prototype.dequeue = function () {
    return this.elements.shift();
};

Queue.prototype.isEmpty = function () {
    return this.elements.length === 0;
};

Queue.prototype.peek = function () {
    return !this.isEmpty() ? this.elements[0] : undefined;
};

Queue.prototype.length = function() {
    return this.elements.length;
}

Queue.prototype.list = function() {
    let list = [];
    this.elements.map(e => {
        list.push(e);
    })
    return list;
}