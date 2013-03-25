ig.module(
    'game.entities.bug'
)
.requires(
    'impact.game'
)
.defines(function(){

EntityBug = ig.Entity.extend({
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    animSheet: new ig.AnimationSheet('media/bug.png', 101, 171),
    size: {x: 101, y: 171},
    init: function (x, y, settings) {
        this.tile = settings.tile;
        this.parent(x, y, settings);
        this.addAnim('idle', 1, [0]);
        this.currentAnim = this.anims.idle;
    },
    update: function (){
        this.parent();
        this.pos.x -= 20;
    }
});

});
