ig.module(
    'game.entities.dit'
)
.requires(
    'game.entities.baseTouch'
)
.defines(function(){

EntityDit = EntityBaseTouch.extend({
    update: function () {
        this.parent();
        if (this.clickOnMe()){
            ig.game.listener.updateCord('.');
        }
    },

});

});
