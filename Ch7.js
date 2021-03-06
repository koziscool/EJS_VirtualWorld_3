
var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];


var Square = function(x, y) {
  this.x = x;
  this.y = y;
};

var Grid = function( width, height ){
  this.space = new Array( width * height );
  this.width = width;
  this.height = height;
};

Grid.prototype.get = function( square ){
  return this.space[ this.width * square.x + square.y ];
};

Grid.prototype.set = function( square, value ){
  this.space[ this.width * square.x + square.y ] = value;
};


directions = "n ne e se s sw w nw".split(" ");

var randomElement = function( array ){
  return array[ Math.floor( Math.random() * array.length )];
};

var BouncingCritter = function() {
  this.direction = randomElement( directions );
};

var Wall = function() {};

var elementFromChar = function( legend, ch ){
  // console.log( ch);
  if (ch === " ") return null;
  var element = new legend[ch]();
  element.origin = ch;
  return element;
};

var charFromElement = function( element ) {
  if ( !element ) return " ";
  else return element.origin;
};


var World = function( plan, legend ) {
  var grid = new Grid( plan[0].length, plan.length );

  plan.forEach( function( rowChars, rowIndex ){
    for (var col = 0; col < rowChars.length; col++ ){
      // console.log ( rowChars[col] );
      grid.set( new Square(col, rowIndex ), elementFromChar(legend, rowChars[col]));
    }
  });
  this.grid = grid;
  this.legend = legend;
};

World.prototype.toString = function() {
  var ret_str = "";
  for ( var row = 0; row < this.grid.height; row++ ){
    for ( var col = 0; col < this.grid.width; col++ ){
      ret_str += charFromElement( this.grid.get( new Square(col, row )));
    }
    ret_str += "\n";
  }
  return ret_str;
}

var world = new World( plan, 
  {
    "#": Wall,
    "o": BouncingCritter
  }
);

console.log( world.toString() );

