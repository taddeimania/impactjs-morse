ig.module(
    'game.backgrounds.grass'
)
.requires(
    'impact.game'
)
.defines(function(){

MAP = [
 "9997777999",
 "9298888929",
 "9200000029",
 "9200000029",
 "9200000029",
 "9200000029"
]

GrassBackground = ig.Class.extend({
    loaded: false,
    init: function () {
        this.boy = new ig.Image('media/boy.png');
        this.treeTall = new ig.Image('media/treeTall.png');
        this.blank = new ig.Image('media/blank.png');
        this.grassBlock = new ig.Image('media/grassBlock.png');
        this.dirtBlock = new ig.Image('media/dirtBlock.png');
        this.woodBlock = new ig.Image('media/woodBlock.png');
        this.plainBlock = new ig.Image('media/plainBlock.png');
        this.stoneBlock = new ig.Image('media/stoneBlock.png');
        this.waterBlock = new ig.Image('media/waterBlock.png');
        this.wallBlock = new ig.Image('media/wallBlock.png');
        this.stoneTallBlock = new ig.Image('media/stoneTallBlock.png');
        this.wallTallBlock = new ig.Image('media/wallTallBlock.png');
        this.shadowEast = new ig.Image('media/shadowEast.png');
        this.shadowWest = new ig.Image('media/shadowWest.png');
        this.tileMap = [this.grassBlock, this.dirtBlock, this.woodBlock,
                        this.plainBlock, this.stoneBlock, this.waterBlock, 
                        this.wallBlock, this.blank, this.wallTallBlock,
                        this.stoneTallBlock]
    },
    draw: function () {
        if (this.tilesLoaded()){
            this.drawMap();
        }
    },
    drawMap: function () {
        for (var j = 0 ; j < MAP.length ; j++){
            // COLUMNS
            for (var i = 0 ; i < MAP[j].length ; i++){
                var tile = parseInt(MAP[j][i]);
                var currentTile = this.getCurrentTile(j, i)
                // DRAW THE IMAGE GIVEN THE X/Y
                this.tileMap[MAP[j][i]].draw(currentTile.x, currentTile.y);

                // CALCULATE THE POSITION OF TILES AND DRAW THE SHADOWS
                // this could probably be optimized
                if (tile < 8){
                    if (i > 0 && this.checkLeftTile(MAP, j, i)){
                        this.shadowWest.draw(currentTile.x, currentTile.y);
                    }
                    if (i < 9 && this.checkRightTile(MAP, j, i)){
                        this.shadowEast.draw(currentTile.x, currentTile.y);
                    }
                }
                // optional draws (these will be replaced)
                if (j === 5 && i === 2){
                    this.boy.draw(currentTile.x, currentTile.y - 50);
                }
                if (j === 5 && i === 1){
                    this.treeTall.draw(currentTile.x, currentTile.y - 50);
                }

            }
        }
    },
    getCurrentTile: function (j, i){
        return {x: (i*100)-25, y: (j*82)+27};
    },
    checkRightTile: function (MAP, j, i) {
        return parseInt(MAP[j][i+1]) > 7;
    },
    checkLeftTile: function (MAP, j, i) {
        return parseInt(MAP[j][i-1]) > 7;
    },
    tilesLoaded: function () {
        if (!this.loaded){
            for (var i ; i < this.tileMap.length ; i++){
                if (!this.tileMap.loaded){
                    return false;
                }
            }
        }
        this.loaded = true;
        return true;
    }

});

});
