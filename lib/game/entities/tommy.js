ig.module(
    'game.entities.tommy'
)
.requires(
    'impact.game'
)
.defines(function(){

EntityTommy = ig.Entity.extend({
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.B,
    animSheet: new ig.AnimationSheet('media/boy.png', 101, 171),
    size: {x: 101, y: 171},
    init: function (x, y, settings) {
        this.collided = false;
        this.jumpOffset = 1.2;
        this.checking = false;
        this.tile = settings.tile;
        this.parent(x, y, settings);
        this.addAnim('idle', 1, [0]);
        this.currentAnim = this.anims.idle;
    },
    update: function (){
        this.parent();
        if (ig.input.pressed('check') && !this.checking){
            ig.game.listener.sendCord();
            this.validate();
        }
    },
    check: function (){
        this.parent();
        if (this.jumping){
            this.jumping = false;
            this.collided = true;
        } else {
            this.collided = false;
        }
    },
    validate: function () {
        this.checking = true;
        ig.game.bug = ig.game.spawnEntity('EntityBug', 960, 325);
        if (ig.game.listener.success()){
            this.originalY = this.pos.y;
            this.jumpingTimer = new ig.Timer();
            this.jumping = true;
        }
    }

});

});
