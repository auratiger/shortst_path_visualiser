export default function Stack() {
    this.elements = [];
}

Stack.prototype.push = function(e){
    this.elements.push(e);
}

Stack.prototype.pop = function(){
    if (this.items.length == 0){
        return "Underflow"; 
    } 
    return this.items.pop();
}
