ig.module(
    'game.backgrounds.mapTiles'
)
.requires(
    'impact.game'
)
.defines(function(){

MapTiles = ig.Class.extend({
    loaded: false,
    init: function () {
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
    tilesLoaded: function () {
        if (!this.loaded){
            for (var i = 0 ; i < this.tileMap.length ; i++){
                if (!this.tileMap[i].loaded){
                    return false;
                }
            }
        }
        this.loaded = true;
        return true;
    }

});

});
