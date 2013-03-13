ig.module(
    'game.entities.tommy'
)
.requires(
    'impact.game'
)
.defines(function(){

EntityTommy = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/boy.png', 101, 171),
    size: {x: 101, y: 171},
    init: function (x, y, settings) {
        this.tile = settings.tile;
        this.parent(x, y, settings);
        this.addAnim('idle', 1, [0]);
        this.currentAnim = this.anims.idle;
    },
    update: function (){
        this.parent();
        if (ig.input.pressed('up')){
            this.move('up');
        } else if (ig.input.pressed('down')){
            this.move('down');
        } else if (ig.input.pressed('right')){
            this.move('right');
        } else if (ig.input.pressed('left')){
            this.move('left');
        }
    },
    move: function (direction){
        if (direction === 'up'){
            if (!ig.game.background.checkAboveTile(this.tile[0], this.tile[1])){
                this.tile[0] -= 1;
            }
        } else if (direction === 'down'){
            if (!ig.game.background.checkBelowTile(this.tile[0], this.tile[1])){
                this.tile[0] += 1;
            }
        } else if (direction === 'right'){
            if (!ig.game.background.checkRightTile(this.tile[0], this.tile[1])){
                this.tile[1] += 1;
            }
        } else if (direction === 'left'){
            if (!ig.game.background.checkLeftTile(this.tile[0], this.tile[1])){
                this.tile[1] -= 1;
            }
        }
        var newCoords = ig.game.background.getCharCoords(this.tile[0], this.tile[1]);
        this.pos.x = newCoords.x;
        this.pos.y = newCoords.y;
    }

});

});
