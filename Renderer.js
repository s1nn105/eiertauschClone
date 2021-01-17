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
     */
    constructor(cContext, height, width) {
        this.height = height;
        this.width = width;
        this.cContext = cContext;
    }

    /**
     * Renders the grid for  the game
     * @param rows the number of rows the grid should have
     * @param columns the number of columns the grid should have
     */
    drawGrid(rows, columns) {
        //calculate the step sizes
        console.log("runs");

        var rowStep = this.height / rows;
        var columnStep = this.width / columns;
        console.log(rowStep);
        console.log(columnStep);
        var i ; //why
        //draw the horizontal lines as rectangles with height 1
        for ( i = 1; i < rows; i++) {

            this.cContext.fillRect(0, i * rowStep, this.width, this.strokeStrength);

        }
        for ( i = 1; i < columns; i++) {

            this.cContext.fillRect(i * columnStep, 0, this.strokeStrength, this.height);

        }

    }
}