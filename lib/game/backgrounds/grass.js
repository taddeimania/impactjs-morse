ig.module(
    'game.backgrounds.grass'
)
.requires(
    'impact.game',
    'game.backgrounds.mapTiles'
)
.defines(function(){

MAP = [
 "9997777999",
 "9298888929",
 "9222222229",
 "9200000029",
 "9200000029",
 "9200000029"
];

COLLISION = [
 "1111111111",
 "1011111101",
 "1000000001",
 "1000000001",
 "1000000001",
 "1000000001"
];

GrassBackground = ig.Class.extend({
    init: function () {
        this.map = new MapTiles();
        this.miscTiles = [
            [this.map.treeTall, [4, 1]],
            [this.map.treeTall, [2, 2]]
        ];
    },
    draw: function () {
        if (this.map.tilesLoaded()){
            this.drawMap();
        }
    },
    drawMap: function () {
        for (var j = 0 ; j < MAP.length ; j++){
            for (var i = 0 ; i < MAP[j].length ; i++){
                var tile = parseInt(MAP[j][i]);
                var currentTile = this.getCurrentCoords(j, i)

                this.map.tileMap[MAP[j][i]].draw(currentTile.x, currentTile.y);

                // SHADOW MAP
                // should I just treat this is as a map as tile/collision?
                // would see a big leap in perf.
                if (tile < 8){
                    if (i > 0 && this.checkLeftTileForShadow(j, i)){
                        this.map.shadowWest.draw(currentTile.x, currentTile.y);
                    }
                    if (i < 9 && this.checkRightTileForShadow(j, i)){
                        this.map.shadowEast.draw(currentTile.x, currentTile.y);
                    }
                }

            }
        }
    },
    drawExtra: function () {
        for (var i = 0 ; i < this.miscTiles.length ; i++){
            var tileObj = this.miscTiles[i][0];
            var coords = this.miscTiles[i][1];
            var tileCoords = this.getCurrentCoords(coords[0], coords[1]);
            tileObj.draw(tileCoords.x, tileCoords.y - 65);
        }
    },
    getCharCoords: function (j, i){
        var currentTile = this.getCurrentCoords(j, i);
        currentTile.y -= 50;
        return currentTile;
    },
    getCurrentCoords: function (j, i){
        return {x: (i*100)-25, y: (j*82)+27};
    },
    checkBelowTile: function (j, i){
        if (j > 4){
            return true;
        }

        return parseInt(COLLISION[j+1][i]) > 0;
    },
    checkAboveTile: function (j, i){
        if (j === 0){
            return true;
        }

        return parseInt(COLLISION[j-1][i]) > 0;
    },
    checkRightTileForShadow: function (j, i) {
        if (this.checkRightTile(j, i)){
            return parseInt(MAP[j][i+1]) > 7;
        }

        return parseInt(COLLISION[j][i+1]) > 0;
    },
    checkLeftTileForShadow: function (j, i) {
        if (this.checkLeftTile(j, i)){
            return parseInt(MAP[j][i-1]) > 7;
        }

        return parseInt(COLLISION[j][i-1]) > 0;
    },
    checkRightTile: function (j, i) {
        if (i > 9){
            return true;
        }

        return parseInt(COLLISION[j][i+1]) > 0;
    },
    checkLeftTile: function (j, i) {
        if (i === 0){
            return true;
        }

        return parseInt(COLLISION[j][i-1]) > 0;
    },
    tilesLoaded: function () {
        if (!this.map.loaded){
            for (var i ; i < this.tileMap.length ; i++){
                if (!this.map.tileMap.loaded){
                    return false;
                }
            }
        }
        this.map.loaded = true;
        return true;
    }

});

});
