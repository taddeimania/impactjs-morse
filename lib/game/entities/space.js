ig.module(
    'game.entities.space'
)
.requires(
    'game.entities.baseTouch'
)
.defines(function(){

EntitySpace = EntityBaseTouch.extend({
    animSheet: new ig.AnimationSheet('media/touchEtcEntity.png', 320, 214),
    size: {x: 320, y: 214},
    update: function () {
        this.parent();
        if (this.clickOnMe()){
            ig.game.listener.addSpace();
        }
    },

});

});
