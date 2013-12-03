var Pathing = function () {
    var points = parseJSON("Content/Paths/EnemyPaths.json");
    
    function getPath(index, inner) {
        var paths = points.points[index];
        
        var path = inner !== undefined? inner : 
                Math.floor(Math.random() * 1000) % paths.possiblePaths.length;
        
        return paths.possiblePaths[path];
    }
    this.getPath = getPath;
}