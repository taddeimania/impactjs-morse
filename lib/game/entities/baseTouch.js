ig.module(
    'game.entities.baseTouch'
)
.requires(
    'impact.game'
)
.defines(function(){

EntityBaseTouch = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/touchEntity.png', 320, 640),
    size: {x: 320, y: 640},
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.addAnim('idle', 1, [0]);
        this.currentAnim.alpha = 0;

    },
    update: function () {
        this.parent();
        if (this.clickOnMe()){
            this.currentAnim.alpha = 1;
        }
    },
    draw: function () {
        this.parent();
        if (this.currentAnim.alpha > .1){
            this.currentAnim.alpha -= .25;
        } else if (this.currentAnim.alpha < .1){
            this.currentAnim.alpha = 0;
        }
    },
    clickOnMe: function () {
        return ig.input.pressed('click')
            && (ig.input.mouse.y > this.pos.y
            && ig.input.mouse.y < this.pos.y + this.size.y)
            && (ig.input.mouse.x > this.pos.x
            && ig.input.mouse.x < this.pos.x + this.size.x);
    },

});

});
