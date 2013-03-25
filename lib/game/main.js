ig.module(
    'game.main'
)
.requires(
    'impact.game',
    'impact.font',
    'game.controllers.listener',
    'game.backgrounds.grass',
    'game.entities.tommy',
    'game.entities.bug',
    'game.entities.dah',
    'game.entities.dit',
    'game.entities.backspace',
    'game.entities.enter',
    'game.entities.space'
)
.defines(function(){
VERSION = "0.0.3.3-24.1"

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
        this.background = new GrassBackground(); 
        this.listener = new Listener(ig.KEY.Z, ig.KEY.M, ig.KEY.SPACE, 'sos');
        ig.input.bind(ig.KEY.Z, '.');
        ig.input.bind(ig.KEY.M, '-');
        ig.input.bind(ig.KEY.ENTER, 'check');
        this.dit = ig.game.spawnEntity('EntityDit', 0, 0);
        this.dah = ig.game.spawnEntity('EntityDah', 640, 0);
        this.space = ig.game.spawnEntity('EntitySpace', 320, 0);
        this.backspace = ig.game.spawnEntity('EntityBackspace', 320, 428);
        this.enter = ig.game.spawnEntity('EntityEnter', 320, 214);
        var tommySpawn = this.background.getCharCoords(4, 3);
        this.tommy = ig.game.spawnEntity('EntityTommy', tommySpawn.x, tommySpawn.y, {tile: [4, 3]});
        ig.input.bind(ig.KEY.MOUSE1, 'click');
    },
    update: function() {
        this.parent();
        this.listener.update();
        if (this.bug && this.bug.pos.x < -100){
            this.tommy.checking = false;
            this.bug.kill();
            this.bug = undefined;
        }
    },
    draw: function () {
        this.parent();
        this.background.draw();
        this.listener.draw();
        this.tommy.draw();
        if (this.bug){
            this.bug.draw();
        }

        // this.instructions.draw('Instructions:', 0, 400, ig.Font.ALIGN.LEFT);
        // this.instructions.draw('   Z  : .', 20, 430, ig.Font.ALIGN.LEFT);
        // this.instructions.draw('   M : -', 18, 460, ig.Font.ALIGN.LEFT);
        // this.instructions.draw(' ESC : CANCEL', 9, 490, ig.Font.ALIGN.LEFT);
        // this.instructions.draw(' ENTER (or wait a sec): REGISTER', 9, 520, ig.Font.ALIGN.LEFT);
        // this.instructions.draw(' BACKSPACE & SPACE do what you think.', 9, 550, ig.Font.ALIGN.LEFT);
    }
});

ig.main( '#canvas', MyGame, 60, 960, 640, 1 );

});
