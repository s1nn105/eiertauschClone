/**
 * a somewhat game engine like class that handles the tiles and that kind of stuff
 */
class GameEngine {

    constructor(rows, columns) {
        console.log("GameEngine Init");
        this.rows = rows;
        this.columns = columns;
        this.tileMap = [];
        this.score = 0;
        this.pointsPerBlob = 100;
        this.removed = [];

        //currently not needed but to avoid magic numbers and to prepare for arbitrary pieces
        this.pieces = pieces;
        //the last  n pieces are special pieces like glitter therefore define an custom array length
        this.piecesLength = Object.keys(this.pieces).length - 3; //TODO FIXME for testing fewer  elements

        //fill the board with pieces
        for (let i = 0; i < this.columns; i++) {
            this.tileMap[i] = [];
            for (let j = 0; j < this.rows; j++) {
                this.tileMap[i][j] = this.randomPiece();
            }
        }


    }

    /**
     * Simple supplier for random pieces to populate the playingfield
     * @return a piece object
     */
    randomPiece() {
        return Object.values(this.pieces)[Math.floor(Math.random() * this.piecesLength)];
    }

    /**
     * method that checks if 3 matching colors are next to each other so that they can be replaced
     * and handles the consequences by calling the appropriate function
     */
    checkForBlobs() {
        //first go through the inner array as this is easier

        for (let i = 0; i < this.columns; i++) {
            let c = 0;
            let toBreak = false;
            let matchingPieces = [];
            let pivotPiece = this.tileMap[i][0];
            for (let j = 0; j < this.rows; j++) {
                if (this.tileMap[i][j] == pivotPiece) {
                    c++;
                    matchingPieces.push([i, j]);
                } else {
                    pivotPiece = this.tileMap[i][j];
                    if (toBreak) {
                        break;
                    }

                }
                if (c == 3) { //pray that this works pls js
                    toBreak = true;
                }
            }
            //we found something
            if (toBreak) {
                this.remove(matchingPieces)
            }

        }
        for (let i = 0; i < this.columns; i++) {
            let c = 0;
            let toBreak = false;
            let matchingPieces = [];
            let pivotPiece = this.tileMap[0][i];
            for (let j = 0; j < this.rows; j++) {
                if (this.tileMap[j][i] == pivotPiece) {
                    c++;
                    matchingPieces.push([j, i]);
                } else {
                    pivotPiece = this.tileMap[j][i];
                    if (toBreak) {
                        break;
                    }

                }
                if (c == 3) { //pray that this works pls js
                    toBreak = true;
                }
            }
            //we found something
            if (toBreak) {
                this.remove(matchingPieces)
            }

        }

    }

    /**
     * Internal method used to remove pieces that are next to each other
     * @param pieces a array of arrays each element is a array of length two in which the x and y coordinate of one piece are stored
     */
    remove(pieces) {
        for (const piece of pieces) {
            this.removed.push(piece);
            //null might be problematic. Lets see how it goes
            this.setGrid(piece[0], piece[1], null);
            this.score += this.pointsPerBlob;

        }
        this.refill();

    }

    /**
     * internal method that refills the tilemap after points where scored
     */
    refill() {
        console.log("REFILL");
        for (const npiece of this.removed) {
            let curY = npiece[1];
            let curX = npiece[0];

            while (curY > 0) {
                this.swapPieces(curX, curY, curX, curY - 1);
                curY--;
            }
            //Now the empty piece is at the top refill it with a new one
            this.setGrid(curX, curY, this.randomPiece());
        }
        //clear this.removed otherwise we will clean cleaned field again
        this.removed = [] //could have done something fancy with pop but then again where is the point in not implementing a queue or a FIFO stack


    }

    /**
     * simple getter that gets the object at the (x,y) coord in the grid
     * @param x
     * @param y
     * @returns {*}
     */
    getGrid(x, y) {
        return this.tileMap[x][y];
    }

    setGrid(x, y, piece) {
        this.tileMap[x][y] = piece;
    }

    swapPieces(fromX, fromY, toX, toY) {
        let p1 = this.getGrid(fromX, fromY);
        this.setGrid(fromX, fromY, this.getGrid(toX, toY));
        this.setGrid(toX, toY, p1);
    }
}