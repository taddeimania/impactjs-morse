ig.module(
    'game.entities.enter'
)
.requires(
    'game.entities.baseTouch'
)
.defines(function(){

EntityEnter = EntityBaseTouch.extend({
    animSheet: new ig.AnimationSheet('media/touchEtcEntity.png', 320, 214),
    size: {x: 320, y: 214},
    update: function () {
        this.parent();
        if (this.clickOnMe()){
            ig.game.listener.sendCord();
        }
    },

});

});
