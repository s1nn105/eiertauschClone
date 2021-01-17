/**
 * Class that is responible for drawing on the canvas
 */
class Renderer {
    strokeStrength = 1;
    /**
     * Constructor that takes the canvas context and the canvas height and width
     * Might only need the canvas context if there is a way to get the dimensions from that
     * @param cContext the canvas context
     * @param height the canvas height
     * @param width the canvas width
     * @param rows the amount of rows
     * @param columns the amount of columns
     * FIXME better modelling so that renderer does not need to know how many rows or columns are in the game
     */
    constructor(cContext, height, width,rows,columns) {
        this.height = height;
        this.width = width;
        this.rows = rows;
        this.columns = columns;
        this.rowStep  = this.height / this.rows;
        this.columnStep = this.width / this.columns;
        this.cContext = cContext;
        //a size factor for the egg size
        this.eggFactor =0.8;
    }

    /**
     * Renders the grid for  the game
     * @param rows the number of rows the grid should have
     * @param columns the number of columns the grid should have
     */
    drawGrid(rows, columns) {
        //calculate the step sizes
        console.log("runs draw Grid");

        var i ; //why
        //draw the horizontal lines as rectangles with height 1
        for ( i = 1; i < rows; i++) {

            this.cContext.fillRect(0, i * this.rowStep, this.width, this.strokeStrength);

        }
        for ( i = 1; i < columns; i++) {

            this.cContext.fillRect(i * this.columnStep, 0, this.strokeStrength, this.height);

        }

    }

    /**
     * Draws an egg shape with given color in the given cell of the grid
     * @param x the x coordinate
     * @param y the y coordinate
     * @param color
     * Cells are labeled like follows with (x,y)
     * (0,0)  (1,0) (2,0)
     * (0,1)  (1,1) (2,1)
     * (0,2)  (1,2) (2,2)
     */
    drawEggInCell(x,y,color){
        let topLeftx = x*this.columnStep;
        let topLefty  = y * this.rowStep;
        let centerX = topLeftx +(1/2)*Number(  this.columnStep);
        let centerY = topLefty+ (1/2)*Number( this.rowStep);
        let radius = this.columnStep>this.rowStep ? this.columnStep/2 : this.rowStep/2;
        radius =radius* this.eggFactor;
        this.cContext.beginPath();
        this.cContext.ellipse(centerX,centerY,radius*this.eggFactor,radius,0,0,Math.PI*2);
        this.cContext.fillStyle = color;
        this.cContext.fill();
        this.cContext.closePath();
    }
}