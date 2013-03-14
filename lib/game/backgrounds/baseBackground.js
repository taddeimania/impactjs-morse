ig.module(
    'game.backgrounds.baseBackground'
)
.requires(
    'impact.game',
    'game.backgrounds.mapTiles'
)
.defines(function(){

SHADOW_DEF = {
    1: function (self) { return [self.map.shadowWest] },
    2: function (self) { return [self.map.shadowEast] },
    3: function (self) { return [self.map.shadowEast, self.map.shadowWest] }
};

BaseBackground = ig.Class.extend({
    init: function () {
        this.map = new MapTiles();
    },
    draw: function () {
        if (this.map.tilesLoaded()){
            this.drawMap();
        }
    },
    drawMap: function () {
        for (var j = 0 ; j < this.MAP.length ; j++){
            for (var i = 0 ; i < this.MAP[j].length ; i++){
                var tile = parseInt(this.MAP[j][i]);
                var currentTile = this.getCurrentCoords(j, i)

                this.map.tileMap[this.MAP[j][i]].draw(currentTile.x, currentTile.y);

                var shadowTile = this.SHADOW[j][i];
                if (shadowTile > 0){
                    var shadowList = SHADOW_DEF[shadowTile](this);
                    for (var k = 0 ; k < shadowList.length ; k++){
                        shadowList[k].draw(currentTile.x, currentTile.y);
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

        return parseInt(this.COLLISION[j+1][i]) > 0;
    },
    checkAboveTile: function (j, i){
        if (j === 0){
            return true;
        }

        return parseInt(this.COLLISION[j-1][i]) > 0;
    },
    checkRightTileForShadow: function (j, i) {
        if (this.checkRightTile(j, i)){
            return parseInt(this.MAP[j][i+1]) > 7;
        }

        return parseInt(this.COLLISION[j][i+1]) > 0;
    },
    checkLeftTileForShadow: function (j, i) {
        if (this.checkLeftTile(j, i)){
            return parseInt(this.MAP[j][i-1]) > 7;
        }

        return parseInt(this.COLLISION[j][i-1]) > 0;
    },
    checkRightTile: function (j, i) {
        if (i > 9){
            return true;
        }

        return parseInt(this.COLLISION[j][i+1]) > 0;
    },
    checkLeftTile: function (j, i) {
        if (i === 0){
            return true;
        }

        return parseInt(this.COLLISION[j][i-1]) > 0;
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
