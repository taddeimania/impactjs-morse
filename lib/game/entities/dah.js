ig.module(
    'game.entities.dah'
)
.requires(
    'game.entities.baseTouch'
)
.defines(function(){

EntityDah = EntityBaseTouch.extend({
    update: function () {
        this.parent();
        if (this.clickOnMe()){
            ig.game.listener.updateCord('-');
        }
    },

});

});
