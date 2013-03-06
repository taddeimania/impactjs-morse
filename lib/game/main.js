ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.controllers.listener'
)
.defines(function(){
VERSION = "0.0.1.3-5"

MainGame = ig.Game.extend({
    versionFont: new ig.Font('media/font.png'),
    draw: function () {
        this.parent();
        this.versionFont.draw('Build: ' + VERSION, 0, 0, ig.Font.ALIGN.LEFT);
    }
});

MyGame = MainGame.extend({
	init: function() {
        this.listener = new Listener(ig.KEY.Z, ig.KEY.M, ig.KEY.ENTER, 'sos');
	},
	update: function() {
		this.parent();
        this.listener.update();
        if (this.listener.success()){
            console.log('SUCCESS!');
        }
	},
    draw: function () {
        this.parent();
        this.listener.draw();
    }
});

ig.main( '#canvas', MyGame, 60, 960, 640, 1 );

});
