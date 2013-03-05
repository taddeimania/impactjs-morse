ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font'
)
.defines(function(){
MORSE_DICT = {
    a: ['dit', 'dah'],
    b: ['dah', 'dit', 'dit', 'dit'],
    c: ['dah', 'dit', 'dah', 'dit'],
    d: ['dah', 'dit', 'dit'],
    e: ['dit'],
    f: ['dit', 'dit', 'dah', 'dit'],
    g: ['dah', 'dah', 'dit'],
    h: ['dit', 'dit', 'dit', 'dit'],
    i: ['dit', 'dit'],
    j: ['dit', 'dah', 'dah', 'dah'],
    k: ['dah', 'dit', 'dah'],
    l: ['dit', 'dah', 'dit', 'dit'],
    m: ['dah', 'dah'],
    n: ['dah', 'dit'],
    o: ['dah', 'dah', 'dah'],
    p: ['dit', 'dah', 'dah', 'dit'],
    q: ['dah', 'dah', 'dit', 'dah'],
    r: ['dit', 'dah', 'dit'],
    s: ['dit', 'dit', 'dit'],
    t: ['dah'],
    u: ['dit', 'dit', 'dah'],
    v: ['dit', 'dit', 'dit', 'dah'],
    w: ['dit', 'dah', 'dah'],
    x: ['dah', 'dit', 'dit', 'dah'],
    y: ['dah', 'dit', 'dah', 'dah'],
    z: ['dah', 'dah', 'dit', 'dit']
}
MyGame = ig.Game.extend({
    cord: [],	
    string: "",
	font: new ig.Font( 'media/font.png' ),
	init: function() {
        // ig.input.bind(ig.KEY.MOUSE1, 'click');
        ig.input.bind(ig.KEY.Z, 'dit');
        ig.input.bind(ig.KEY.M, 'dah');
        ig.input.bind(ig.KEY.SPACE, 'space');
        ig.input.bind(ig.KEY.BACKSPACE, 'backspace');
        this.activeTimer = new ig.Timer();
	},
	
	update: function() {
		this.parent();
        if (this.activeTimer.delta() > .75){
            this.flushCord();
            this.activeTimer.reset();
        }
        if (ig.input.pressed('dit')){
            this.updateCord('dit');
        } else if (ig.input.pressed('dah')){
            this.updateCord('dah');
        } else if (ig.input.pressed('space')){
            this.string = this.string + " ";
        } else if (ig.input.pressed('backspace')){
            this.string = this.string.slice(0, this.string.length-1);
        }

	},
    draw: function () {
        this.parent();
		var x = ig.system.width/2,
			y = ig.system.height/2;
		
		this.font.draw( this.cord, x, y, ig.Font.ALIGN.CENTER );
		this.font.draw( this.string, x, y-60, ig.Font.ALIGN.CENTER );
    },
    updateCord: function (instruction) {
        this.activeTimer.reset();
        this.validateCord();
        this.cord.push(instruction);
    },
    validateCord: function () {
        if (this.cord.length >= 6){
            this.flushCord();
        }
    },
    evaluateCord: function () {
        for (var key in MORSE_DICT){
            var value = MORSE_DICT[key];
            if (_.isEqual(value, this.cord)){
                this.string = this.string + key
                return key;
            }
        }
    },
    flushCord: function () {
        if (this.cord){
            this.evaluateCord();
        }
        this.cord = [];
    }
});

ig.main( '#canvas', MyGame, 60, 960, 640, 1 );

});
