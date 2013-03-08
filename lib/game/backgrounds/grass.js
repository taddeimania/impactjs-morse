ig.module(
    'game.backgrounds.grass'
)
.requires(
    'impact.game'
)
.defines(function(){

MAP = [
 "9997777999",
 "9100000009",
 "9100000009",
 "9100000009",
 "9100000009",
 "9100000009"
]

GrassBackground = ig.Class.extend({
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
        // ROWS
        for (var j = 0 ; j < MAP.length ; j++){
            // COLUMNS
            for (var i = 0 ; i < MAP[j].length ; i++){
                // DRAW THE IMAGE GIVEN THE X/Y
                this.tileMap[MAP[j][i]].draw((i*100)-25, (j*82)+27);

                // CALCULATE THE POSITION OF TILES AND DRAW THE SHADOWS
                // this could probably be optimized
                if (MAP[j][i] !== '9'){
                    if (i > 0){
                        if (MAP[j][i-1] === '9' || MAP[j][i-1] === '8'){
                            this.shadowWest.draw((i*100)-25, (j*82)+27);
                        }
                    }
                    if (i < 9){
                        if (MAP[j][i+1] === '9' || MAP[j][i+1] === '8'){
                            this.shadowEast.draw((i*100)-25, (j*82)+27);
                        }
                    }
                }
                if (j === 5 && i === 3){
                    this.boy.draw((i*100)-25, (j*82)-40);
                }
                if (j === 5 && i === 1){
                    this.treeTall.draw((i*100)-25, (j*82)-27);
                }

            }
        }
    }
});

});
