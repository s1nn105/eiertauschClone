/**
 * a somewhat game engine like class that handles the tiles and that kind of stuff
 */
class GameEngine{

    constructor(rows,columns) {
        console.log("GameEngine Init");
        this.rows = rows;
        this.columns = columns;
        this.tileMap = [];

        //currently not needed but to avoid magic numbers and to prepare for arbitrary pieces
        this.pieces = pieces;
        //the last  n pieces are special pieces like glitter therefore define an custom array length
        this.piecesLength = Object.keys(this.pieces).length-1;

        //fill the board with pieces
        for(let i=0; i<this.columns; i++){
            this.tileMap[i]  = [];
            for(let j=0 ; j<this.rows; j++){
                this.tileMap[i][j] = Object.values(this.pieces)[Math.floor(Math.random() * this.piecesLength)];
            }
        }


    }

    getGrid(x,y){
        return this.tileMap[x][y];
    }
    setGrid(x,y,piece){
        this.tileMap[x][y] = piece;
    }
    swapPieces(fromX,fromY,toX,toY){
        let p1 = this.getGrid(fromX,fromY);
        this.setGrid(fromX,fromY,this.getGrid(toX,toY));
        this.setGrid(toX,toY,p1);
    }
}