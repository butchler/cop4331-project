function progress(elem, perc) {
    elem.style.width = perc;
}

function setGold(gold) {
    var g = document.getElementById("gold");
    g.innerHTML = gold;
    globals.user.gold = gold;
}

function setRockets(count) {
    var r = document.getElementById('rockets');
    r.innerHTML = count;
    globals.user.rockets = count;
}


function removeEntity(list, index) {
    var obj;
    if (index == list.length - 1 || list.length == 1) 
        obj = list.pop();
    else if (list.length > 1) {
        obj = list[index];
        list[index] = list.pop();
    }

    if (obj !== undefined && obj.destroy !== undefined)
        obj.destroy();
}