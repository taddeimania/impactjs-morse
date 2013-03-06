ig.module( 
	'game.controllers.listener' 
)
.requires(
	'impact.game',
	'impact.font'
)
.defines(function(){
MORSE_DICT = {
    a: '.-',
    b: '-...',
    c: '-.-.',
    d: '-..',
    e: '.',
    f: '..-.',
    g: '--.',
    h: '....',
    i: '..',
    j: '.---',
    k: '-.-',
    l: '.-..',
    m: '--',
    n: '-.',
    o: '---',
    p: '.--.',
    q: '--.-',
    r: '.-.',
    s: '...',
    t: '-',
    u: '..-',
    v: '...-',
    w: '.--',
    x: '-..-',
    y: '-.--',
    z: '--..'
}

Listener = ig.Class.extend({
    cord: '',	
    string: "",
	font: new ig.Font( 'media/font.png' ),
	init: function(dit, dah, term, phrase) {
        ig.input.bind(dit, '.');
        ig.input.bind(dah, '-');
        ig.input.bind(ig.KEY.SPACE, 'space');
        ig.input.bind(ig.KEY.BACKSPACE, 'backspace');
        ig.input.bind(term, 'term');
        ig.input.bind(ig.KEY.ESC, 'kill');
        this.phrase = phrase;
        this.activeTimer = new ig.Timer();
	},
	update: function() {
        if (this.activeTimer.delta() > .75 || ig.input.pressed('term')){
            this.flushCord();
            this.activeTimer.reset();
        }

        if (ig.input.pressed('.')){
            this.updateCord('.');
        } else if (ig.input.pressed('-')){
            this.updateCord('-');
        } else if (ig.input.pressed('space')){
            this.string = this.string + " ";
        } else if (ig.input.pressed('backspace')){
            this.string = this.string.slice(0, this.string.length-1);
        } else if (ig.input.pressed('kill')){
            this.flushCord(true);
        }
	},
    draw: function () {
		var x = ig.system.width/2,
			y = ig.system.height/2;
		
		this.font.draw(this.string, x, y-60, ig.Font.ALIGN.CENTER );
		this.font.draw(this.cord, x, y, ig.Font.ALIGN.CENTER );
    },
    updateCord: function (instruction) {
        this.activeTimer.reset();
        this.validateCord();
        this.cord = this.cord + instruction;
    },
    validateCord: function () {
        if (this.cord.length >= 6){
            this.flushCord();
        }
    },
    evaluateCord: function () {
        for (var key in MORSE_DICT){
            var value = MORSE_DICT[key];
            if (value === this.cord){
                this.string = this.string + key;
                return ;
            }
        }
    },
    flushCord: function (escape) {
        if (this.cord && !escape){
            this.evaluateCord();
        }
        this.cord = [];
    },
    success: function (){
        if (this.phrase === this.string){
            return true;
        }
    }
});


});