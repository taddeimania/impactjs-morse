ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.controllers.listener'
)
.defines(function(){
VERSION = "0.0.1.3-5.1"

MainGame = ig.Game.extend({
    versionFont: new ig.Font('media/font.png'),
    draw: function () {
        this.parent();
        this.versionFont.draw('Build: ' + VERSION, 0, 0, ig.Font.ALIGN.LEFT);
    }
});

MyGame = MainGame.extend({
    instructions: new ig.Font('media/font.png'),
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
        this.instructions.draw('Instructions:', 0, 400, ig.Font.ALIGN.LEFT);
        this.instructions.draw('   Z  : .', 20, 430, ig.Font.ALIGN.LEFT);
        this.instructions.draw('   M : -', 18, 460, ig.Font.ALIGN.LEFT);
        this.instructions.draw(' ESC : CANCEL', 9, 490, ig.Font.ALIGN.LEFT);
        this.instructions.draw(' ENTER (or wait a sec): REGISTER', 9, 520, ig.Font.ALIGN.LEFT);
        this.instructions.draw(' BACKSPACE & SPACE do what you think.', 9, 550, ig.Font.ALIGN.LEFT);
    }
});

ig.main( '#canvas', MyGame, 60, 960, 640, 1 );

});
