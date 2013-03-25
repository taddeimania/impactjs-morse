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
     "7777777777",
     "7777777777",
     "7777777777",
     "0000000004",
     "0000000004",
     "0000000004"
    ],
    COLLISION: [
     "1111111111",
     "1111111111",
     "1111111111",
     "1000000001",
     "1000000001",
     "1000000001"
    ],
    SHADOW: [
     "0000000000",
     "0000000000",
     "0000000000",
     "0000000000",
     "0000000000",
     "0000000000"
    ],
    init: function () {
        this.parent();
        this.miscTiles = [
        ];
    },
});

});
