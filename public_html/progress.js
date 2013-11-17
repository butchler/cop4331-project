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
