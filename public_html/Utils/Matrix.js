var Matrix = function (e) {
    this.elements = [];
    
    if (e !== undefined) 
        this.elements = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1];
    else
        this.elements = e.slice();
}