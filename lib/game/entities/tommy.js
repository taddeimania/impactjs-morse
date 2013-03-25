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
        this.collisionTick = 0;
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
        if (this.jumping){
            if (this.jumpingTimer.delta() > .8){
                if (this.jumpingTimer.delta() < this.jumpOffset){
                    this.pos.y -= this.jumpingTimer.delta() + 23;
                } else if (this.jumpingTimer.delta() > this.jumpOffset && this.jumpingTimer.delta() < this.jumpOffset + .4) {
                    this.pos.y += this.jumpingTimer.delta() + 23;
                } else if (this.pos.y > this.originalY || this.jumpingTimer.delta() > this.jumpOffset + .4){
                    this.pos.y = this.originalY;
                    this.jumping = false;
                    delete this.jumpingTimer;
                }
            }
        }
    },
    check: function (){
        this.parent();
        if (this.collisionTick > 8 && !this.jumping){
            // try again
            this.collisionTick = 0;
        }
        this.collisionTick += 1;
    },
    validate: function () {
        this.checking = true;
        ig.game.bug = ig.game.spawnEntity('EntityBug', 960, 325);
        if (ig.game.listener.success()){
            this.originalY = this.pos.y;
            this.jumpingTimer = new ig.Timer();
            this.jumping = true;
        }
        ig.game.listener.string = "";
    }

});

});
