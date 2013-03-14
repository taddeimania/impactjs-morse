ig.module(
    'game.backgrounds.grass'
)
.requires(
    'impact.game',
    'game.backgrounds.mapTiles',
    'game.backgrounds.baseBackground'
)
.defines(function(){

GrassBackground = BaseBackground.extend({
    MAP: [
     "9990000999",
     "9298888929",
     "9220000229",
     "9200000029",
     "9200000029",
     "9200000029"
    ],
    COLLISION: [
     "1111111111",
     "1011111101",
     "1000000001",
     "1000000001",
     "1000000001",
     "1000000001"
    ],
    SHADOW: [
     "0001002000",
     "0300000030",
     "0100000020",
     "0100000020",
     "0100000020",
     "0100000020"
    ],
    init: function () {
        this.parent();
        this.miscTiles = [
            [this.map.treeTall, [2, 1]],
            [this.map.treeTall, [4, 1]],
            [this.map.treeTall, [2, 2]]
        ];
    },
});

});
