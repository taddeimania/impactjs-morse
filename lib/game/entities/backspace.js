ig.module(
    'game.entities.backspace'
)
.requires(
    'game.entities.baseTouch'
)
.defines(function(){

EntityBackspace = EntityBaseTouch.extend({
    animSheet: new ig.AnimationSheet('media/touchEtcEntity.png', 320, 214),
    size: {x: 320, y: 214},
    update: function () {
        this.parent();
        if (this.clickOnMe()){
            ig.game.listener.backSpace();
        }
    },

});

});
